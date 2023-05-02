import { Grid, Typography } from "@mui/material";
import CourseCard from "components/common/CourseCard";
import { Layout } from "components/common/Layout";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { contentfulClient } from "services/contentful";
import { setHeroImage } from "slices/app.slice";
import type { ICourseFields, IEntry } from "types/contentful";

const Index: NextPage<{ courses: IEntry<ICourseFields>[] }> = ({ courses }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeroImage(process.env.DEFAULT_HERO_IMAGE));
  }, []);

  return (
    <Layout>
      <OrganizationJsonLd
        type="Corporation"
        id="https://study-guru.com"
        logo="https://study-guru.com/static/media/logo.png"
        legalName="Study Guru Private Limited"
        name="Study Guru"
        address={{
          streetAddress: "xxx",
          addressLocality: "xxx",
          addressRegion: "xxx",
          postalCode: "xxx",
          addressCountry: "<XX>",
        }}
        contactPoint={[
          {
            telephone: "<tel>",
            contactType: "query",
            email: "john@example.com",
            areaServed: "<XX>",
            availableLanguage: ["English"],
          },
        ]}
        sameAs={["https://study-guru.com"]}
        url="https://study-guru.com"
      />
      <Typography my={2} variant="h2" color="text.secondary">
        Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const entries = await contentfulClient.getEntries<{
    fields: ICourseFields;
    contentTypeId: "course";
  }>({
    content_type: "course",
  });

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en")),
      courses: entries.items.map((item) => item),
    },
    revalidate: 1,
  };
};

export default Index;
