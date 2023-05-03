import { Box, Typography } from "@mui/material";
import type { Note as INote } from "@prisma/client";
import CheckIcon from "components/icons/CheckIcon";
import PencilIcon from "components/icons/PencilIcon";
import TrashIcon from "components/icons/TrashIcon";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "services/notes";

import convertDate from "utils/convert-date";
import focusElement from "utils/focusElement";

interface INoteProps {
  note: INote;
  userId: string;
  onSave: () => Promise<any>;
}

const Note: FunctionComponent<INoteProps> = ({ note, onSave, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [updateNote, updateNoteResult] = useUpdateNoteMutation();
  const [removeNote, removeNoteResult] = useDeleteNoteMutation();

  useEffect(() => {
    if (updateNoteResult.isError) {
      toast.error("Something went wrong");
    }
  }, [updateNoteResult.isError]);

  useEffect(() => {
    (async () => {
      if (updateNoteResult.isSuccess) {
        toast.success("Note updated successfully");
        updateNoteResult.reset();
        await onSave();
      }
    })();
  }, [updateNoteResult.isSuccess]);

  useEffect(() => {
    if (removeNoteResult.isError) {
      toast.error("Something went wrong");
    }
  }, [removeNoteResult.isError]);

  useEffect(() => {
    (async () => {
      if (removeNoteResult.isSuccess) {
        toast.success("Note removed successfully");
        removeNoteResult.reset();
        await onSave();
      }
    })();
  }, [removeNoteResult.isSuccess]);

  const handleSaveNote = async () => {
    if (textRef.current.textContent !== note.text) {
      try {
        await updateNote({
          noteId: note.id,
          text: textRef.current.textContent,
          userId,
        });
      } catch {
        toast.error("Something went wrong");
      }
    }
    setIsEditing(false);
  };
  const handleRemoveNote = async () => {
    setIsEditing(false);
    try {
      await removeNote({
        noteId: note.id,
        userId,
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isEditing) {
      focusElement(textRef.current);
    }
  }, [isEditing]);

  return (
    <Box>
      <Box
        sx={{ svg: { cursor: "pointer" } }}
        display="flex"
        justifyContent="end"
      >
        <Box display="flex" gap={1} alignItems="center" mb={0.5}>
          {isEditing ? (
            <CheckIcon onClick={() => handleSaveNote()} />
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
            <TrashIcon onClick={() => handleRemoveNote()} />
          </Box>
          <Typography
            variant="caption"
            fontStyle="italic"
            color="text.secondary"
            lineHeight={1}
            fontSize={13}
          >
            {convertDate(note.updatedAt)}
          </Typography>
        </Box>
      </Box>
      <Box
        bgcolor="secondary.light"
        sx={{
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        }}
        borderRadius={3}
        py={1.5}
        px={2}
      >
        <Typography
          ref={textRef}
          contentEditable={isEditing}
          sx={{ outline: "none" }}
          fontSize={15}
          color="text.secondary"
        >
          {note.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Note;
