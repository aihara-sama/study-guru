import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCreateNoteMutation, useGetAllNotesQuery } from "services/notes";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";
import Note from "./Note";

interface INotesProps {
  userId: string;
  lessonId: string;
}

const Notes: FunctionComponent<INotesProps> = ({ userId, lessonId }) => {
  const [createNote, createNoteResult] = useCreateNoteMutation();

  const { data, refetch: refetchNotes } = useGetAllNotesQuery({
    userId,
    lessonId,
  });

  const formik = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: Yup.object().shape({
      note: Yup.string().required("Please enter note content"),
    }),
    onSubmit: async (values, actions) => {
      try {
        await createNote({
          lessonId,
          userId,
          text: values.note,
        });

        actions.resetForm();
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
    if (createNoteResult.isError) {
      toast.error("Something went wrong");
    }
  }, [createNoteResult.isError]);

  useEffect(() => {
    (async () => {
      if (createNoteResult.isSuccess) {
        toast.success("Note saved successfully");
        await refetchNotes();
      }
    })();
  }, [createNoteResult.isSuccess]);

  return (
    <Box>
      <TextField
        multiline
        size="small"
        {...formik.getFieldProps("note")}
        {...getErrorProps(formik, "note")}
        fullWidth
        label="Note"
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
          Your Notes
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          overflow="auto"
          maxHeight={250}
          pr={1}
        >
          {data?.data?.map((note, idx) => (
            <Note userId={userId} key={idx} note={note} onSave={refetchNotes} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
