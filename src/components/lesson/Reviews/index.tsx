import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "services/reviews";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";
import Review from "./Review";

interface IReviewsProps {
  userId: string;
  userImage: string;
  userName: string;
  lessonId: string;
}

const Reviews: FunctionComponent<IReviewsProps> = ({
  userId,
  userImage,
  lessonId,
  userName,
}) => {
  const [createReview, createReviewResult] = useCreateReviewMutation();

  const { data, refetch: refetchReview } = useGetAllReviewsQuery({
    lessonId,
  });

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema: Yup.object().shape({
      review: Yup.string().required("Please enter review content"),
    }),
    onSubmit: async (values, actions) => {
      try {
        await createReview({
          lessonId,
          userId,
          text: values.review,
          userImage,
          userName,
        });

        actions.resetForm();
        createReviewResult.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    validateOnMount: true,
  });

  useEffect(() => {
    if (!formik.isSubmitting) {
      formik.validateForm();
    }
  }, [formik.isSubmitting]);

  useEffect(() => {
    if (createReviewResult.isError) {
      toast.error("Something went wrong");
    }
  }, [createReviewResult.isError]);

  useEffect(() => {
    (async () => {
      if (createReviewResult.isSuccess) {
        toast.success("Review saved successfully");
        await refetchReview();
      }
    })();
  }, [createReviewResult.isSuccess]);

  return (
    <Box>
      <TextField
        multiline
        size="small"
        {...formik.getFieldProps("review")}
        {...getErrorProps(formik, "review")}
        fullWidth
        label="Review"
        minRows={3}
      />
      <Box mt={1} display="flex" justifyContent="end">
        <Button
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting || !formik.isValid}
          variant="contained"
        >
          Save
        </Button>
      </Box>

      <Box>
        <Typography mb={2} variant="h3" color="text.secondary">
          Reviews
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          overflow="auto"
          maxHeight={250}
          pr={1}
        >
          {data?.data?.map((review, idx) => (
            <Review
              userName={userName}
              userId={userId}
              userImage={userImage}
              key={idx}
              review={review}
              onSave={refetchReview}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
