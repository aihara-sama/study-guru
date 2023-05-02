import { Box, Typography, useTheme } from "@mui/material";
import EyeIcon from "components/icons/EyeIcon";
import QusetionIcon from "components/icons/QuestionIcon";
import StarsIcon from "components/icons/StarsIcon";
import type { FunctionComponent } from "react";

interface IVideoCardProps {
  title: string;
  image: string;
  time: number;
  reviews: number;
  faqs: number;
  isActive: boolean;
}

const VideoCard: FunctionComponent<IVideoCardProps> = ({
  faqs,
  reviews,
  image,
  time,
  title,
  isActive,
}) => {
  const theme = useTheme();

  return (
    <Box
      p={1}
      sx={{
        border: `1px solid ${theme.palette.secondary.main}`,
        ":hover": { bgcolor: "secondary.light" },
        ...(isActive && { bgcolor: "secondary.light" }),
      }}
      // bgcolor="secondary.light"
      display="flex"
      gap={2}
    >
      <Box
        component="img"
        src={image}
        sx={{
          border: `1px solid ${theme.palette.secondary.light}`,
          borderBottom: "none",
          height: "100%",
          width: "120px",
          objectFit: "cover",
        }}
      />
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography fontWeight={500}>{title}</Typography>
        <Box display="flex" gap={2}>
          <Box display="flex" gap={0.3} alignItems="center">
            <EyeIcon />
            <Typography fontSize={12}>
              {time / 60}:{time % 60}
            </Typography>
          </Box>
          <Box display="flex" gap={0.3} alignItems="center">
            <StarsIcon />
            <Typography fontSize={12}>
              {reviews} review{reviews > 1 ? "s" : ""}
            </Typography>
          </Box>
          <Box display="flex" gap={0.3} alignItems="center">
            <QusetionIcon />
            <Typography fontSize={12}>{faqs} Q&A</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCard;
