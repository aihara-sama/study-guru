import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useCreateQuestionMutation,
  useGetAllQuestionsQuery,
} from "services/questions";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";
import Question from "./Question";

interface IQuestionsProps {
  userId: string;
  userImage: string;
  userName: string;
  lessonId: string;
}

const Questions: FunctionComponent<IQuestionsProps> = ({
  userId,
  userImage,
  lessonId,
  userName,
}) => {
  const [createQuestion, createQuestionResult] = useCreateQuestionMutation();

  const { data, refetch: refetchQuestion } = useGetAllQuestionsQuery({
    lessonId,
  });

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: Yup.object().shape({
      question: Yup.string().required("Please enter question content"),
    }),
    onSubmit: async (values, actions) => {
      try {
        await createQuestion({
          lessonId,
          userId,
          text: values.question,
          userImage,
          userName,
        });

        actions.resetForm();
        createQuestionResult.reset();
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
    if (createQuestionResult.isError) {
      toast.error("Something went wrong");
    }
  }, [createQuestionResult.isError]);

  useEffect(() => {
    (async () => {
      if (createQuestionResult.isSuccess) {
        toast.success("Question saved successfully");
        await refetchQuestion();
      }
    })();
  }, [createQuestionResult.isSuccess]);

  return (
    <Box>
      <TextField
        multiline
        size="small"
        {...formik.getFieldProps("question")}
        {...getErrorProps(formik, "question")}
        fullWidth
        label="Question"
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
          Questions
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          overflow="auto"
          maxHeight={250}
          pr={1}
        >
          {data?.data?.map((question, idx) => (
            <Question
              lessonId={lessonId}
              userName={userName}
              userId={userId}
              userImage={userImage}
              key={idx}
              question={question}
              onSave={refetchQuestion}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Questions;
