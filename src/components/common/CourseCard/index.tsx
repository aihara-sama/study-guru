import { Box, Link as MuiLink, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import type { FunctionComponent } from "react";
import type { ICourseFields, IEntry } from "types/contentful";

interface ICourseCardProps {
  course: IEntry<ICourseFields>;
}

const CourseCard: FunctionComponent<ICourseCardProps> = ({ course }) => {
  const theme = useTheme();
  return (
    <MuiLink
      component={Link}
      href={`/courses/${course.fields.slug}`}
      color="inherit"
      underline="none"
    >
      <Box height={{ xs: 300, sm: 130 }}>
        <Box
          component="img"
          alt={course.fields.thumbnail.fields.title}
          src={`https:${course.fields.thumbnail.fields.file.url}`}
          sx={{
            border: `1px solid ${theme.palette.secondary.light}`,
            borderBottom: "none",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box p={2} bgcolor="secondary.light" height={{ xs: 250, sm: 190 }}>
        <Typography
          title={course.fields.title}
          mb={1}
          fontSize={20}
          fontWeight="bold"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            "-webkit-line-clamp": "1",
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
          }}
        >
          {course.fields.title}
        </Typography>

        <Typography
          title={course.fields.description}
          color="text.secondary"
          fontSize={16}
          sx={{
            display: "-webkit-box",
            "-webkit-line-clamp": { xs: "7", sm: "5" },
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
          }}
        >
          {course.fields.description}
        </Typography>
      </Box>
    </MuiLink>
  );
};

export default CourseCard;
