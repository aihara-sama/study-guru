import { Box, Typography } from "@mui/material";
import type { Review as IReview } from "@prisma/client";
import CheckIcon from "components/icons/CheckIcon";
import PencilIcon from "components/icons/PencilIcon";
import TrashIcon from "components/icons/TrashIcon";
import Image from "next/image";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "services/reviews";

import convertDate from "utils/convert-date";
import focusElement from "utils/focusElement";

interface IReviewProps {
  review: IReview;
  userId: string;
  userImage: string;
  userName: string;
  onSave: () => Promise<any>;
}

const Review: FunctionComponent<IReviewProps> = ({
  review,
  onSave,
  userId,
  userImage,
  userName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [updateReview, updateReviewResult] = useUpdateReviewMutation();
  const [removeReview, removeReviewResult] = useDeleteReviewMutation();

  const handleUpdateNote = async () => {
    if (textRef.current.textContent !== review.text) {
      try {
        await updateReview({
          reviewId: review.id,
          text: textRef.current.textContent,
          userImage,
          userId,
          userName,
        });
        updateReviewResult.reset();
      } catch {
        toast.error("Something went wrong");
      }
    }
    setIsEditing(false);
  };
  const handleRemoveReview = async () => {
    setIsEditing(false);
    try {
      await removeReview({
        reviewId: review.id,
        userId,
      });
      removeReviewResult.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isEditing) {
      focusElement(textRef.current);
    }
  }, [isEditing]);

  useEffect(() => {
    if (updateReviewResult.isError) {
      toast.error("Something went wrong");
    }
  }, [updateReviewResult.isError]);

  useEffect(() => {
    (async () => {
      if (updateReviewResult.isSuccess) {
        toast.success("Review updated successfully");
        updateReviewResult.reset();
        await onSave();
      }
    })();
  }, [updateReviewResult.isSuccess]);

  useEffect(() => {
    if (removeReviewResult.isError) {
      toast.error("Something went wrong");
    }
  }, [removeReviewResult.isError]);

  useEffect(() => {
    (async () => {
      if (removeReviewResult.isSuccess) {
        toast.success("Review removed successfully");
        removeReviewResult.reset();
        await onSave();
      }
    })();
  }, [removeReviewResult.isSuccess]);

  return (
    <Box>
      <Box
        sx={{ svg: { cursor: "pointer" } }}
        display="flex"
        justifyContent="end"
      >
        <Box display="flex" gap={1} alignItems="center" mb={0.5}>
          {isEditing ? (
            <CheckIcon onClick={() => handleUpdateNote()} />
          ) : (
            <PencilIcon onClick={() => setIsEditing(true)} />
          )}

          <Box
            display="flex"
            sx={{
              "svg:hover path": {
                fill: (theme) => theme.palette.error.main,
              },
            }}
          >
            <TrashIcon onClick={() => handleRemoveReview()} />
          </Box>
          <Typography
            variant="caption"
            fontStyle="italic"
            color="text.secondary"
            lineHeight={1}
            fontSize={13}
          >
            {convertDate(review.updatedAt)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1}>
        <Image
          style={{ borderRadius: "50%", marginTop: "8px" }}
          src={review.userImage}
          width={30}
          height={30}
          alt=""
        />
        <Box
          flex={1}
          bgcolor="secondary.light"
          sx={{
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
          }}
          borderRadius={3}
          pb={1.5}
          pt={0.5}
          px={2}
        >
          <Typography lineHeight={1} fontSize={12} color="text.disabled">
            {userName}
          </Typography>
          <Typography
            ref={textRef}
            contentEditable={isEditing}
            sx={{ outline: "none" }}
            fontSize={15}
            color="text.secondary"
          >
            {review.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
