import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { Layout } from "components/common/Layout";
import { SplashScreen } from "components/common/SplashScreen";
import VideoCard from "components/common/VideoCard";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { contentfulClient } from "services/contentful";
import { setHeroImage } from "slices/app.slice";
import type { ICourseFields, IEntry, ILessonFields } from "types/contentful";

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await contentfulClient.getEntries({
    content_type: "course",
  });
  const paths = items.map((item) => {
    return {
      params: { slug: item.fields.slug as string },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const { items } = await contentfulClient.getEntries({
    content_type: "course",
    "fields.slug": props.params.slug,
  });
  return {
    props: {
      ...(await serverSideTranslations(props.locale ?? "en")),
      course: items[0],
    },
    revalidate: 1,
  };
};

interface ICoursePageProps {
  course: IEntry<ICourseFields>;
}

const CoursePage: NextPage<ICoursePageProps> = ({ course }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentLesson, setCurrentLesson] = useState<IEntry<ILessonFields>>();

  const [value, setValue] = useState("overview");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (course) {
      dispatch(
        setHeroImage(`https:${course.fields.thumbnail.fields.file.url}`)
      );
      const lessonSlug =
        router.query.lesson || course.fields.lessons[0].fields.slug;

      const lesson = course.fields.lessons.find(
        ({ fields }) => fields.slug === lessonSlug
      );

      if (!lesson) {
        router.replace("/");
      }

      setCurrentLesson(lesson);
    }
  }, [course, router.query.lesson]);

  if (!course || !currentLesson) return <SplashScreen />;

  return (
    <Layout>
      <Box
        sx={{
          my: 2,
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" gap={1} alignItems="center">
          <AccountCircleIcon fontSize="large" />
          <Box display="flex" flexDirection="column">
            {/* <Typography>{course.author.fields.name}</Typography> */}
            <Typography variant="body2">John Week</Typography>
            <Typography variant="body2">11 Courses</Typography>
          </Box>
        </Box>
        <Button variant="outlined">Subscribe</Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Box
            component="video"
            autoPlay
            controls
            src={`https:${currentLesson.fields.video.fields.file.url}`}
            sx={{
              width: "100%",
            }}
            poster={`https:${currentLesson.fields.thumbnail.fields.file.url}`}
          />
          <Typography fontSize={20} fontWeight={500}>
            {currentLesson.fields.title}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Overview" value="overview" />
                  <Tab label="Notes" value="notes" />
                  <Tab label="Q&A" value="qa" />
                  <Tab label="Reviews" value="reviews" />
                </TabList>
              </Box>
              <TabPanel value="overview">
                <Box>
                  {documentToReactComponents(currentLesson.fields.content)}
                </Box>
              </TabPanel>
              <TabPanel value="notes">Notes</TabPanel>
              <TabPanel value="qa">Q&A</TabPanel>
              <TabPanel value="reviews">Reviews</TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography
            color="text.secondary"
            fontSize={24}
            fontWeight="bold"
            mb={1}
          >
            Course Content
          </Typography>
          <Box mb={2} display="flex" flexDirection="column" gap={1}>
            {course.fields.lessons.map((lesson, idx) => (
              <MuiLink
                underline="none"
                color="inherit"
                component={Link}
                key={idx}
                href={`/courses/${course.fields.slug}?lesson=${lesson.fields.slug}`}
                shallow
              >
                <VideoCard
                  faqs={3}
                  image={`https:${lesson.fields.thumbnail.fields.file.url}`}
                  reviews={4}
                  time={lesson.fields.watchTime}
                  title={lesson.fields.title}
                  isActive={router.query.lesson === lesson.fields.slug}
                />
              </MuiLink>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CoursePage;
