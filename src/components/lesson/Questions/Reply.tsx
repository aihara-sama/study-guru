import { Box, Typography } from "@mui/material";
import type { QuestionReply as IReplyQuestion } from "@prisma/client";
import CheckIcon from "components/icons/CheckIcon";
import PencilIcon from "components/icons/PencilIcon";
import TrashIcon from "components/icons/TrashIcon";
import Image from "next/image";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteQuestionReplyMutation,
  useUpdateQuestionReplyMutation,
} from "services/replies";

import convertDate from "utils/convert-date";
import focusElement from "utils/focusElement";

interface IQuestionProps {
  reply: IReplyQuestion;
  userId: string;
  userImage: string;
  userName: string;
  lessonId: string;
  onSave: () => Promise<any>;
}

const Reply: FunctionComponent<IQuestionProps> = ({
  reply,
  onSave,
  userId,
  userImage,
  userName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateReplyRef = useRef<HTMLParagraphElement>(null);
  const [updateReply, updateReplyResult] = useUpdateQuestionReplyMutation();
  const [removeReply, removeReplyResult] = useDeleteQuestionReplyMutation();

  const handleUpdateReply = async () => {
    if (updateReplyRef.current.textContent !== reply.text) {
      try {
        await updateReply({
          replyId: reply.id,
          text: updateReplyRef.current.textContent,
          userImage,
          userId,
          userName,
        });
        updateReplyResult.reset();
      } catch {
        toast.error("Something went wrong");
      }
    }
    setIsEditing(false);
  };

  const handleRemoveReply = async () => {
    setIsEditing(false);
    try {
      await removeReply({
        replyId: reply.id,
        userId,
      });
      removeReplyResult.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isEditing) {
      focusElement(updateReplyRef.current);
    }
  }, [isEditing]);

  useEffect(() => {
    if (updateReplyResult.isError) {
      toast.error("Something went wrong");
    }
  }, [updateReplyResult.isError]);

  useEffect(() => {
    if (removeReplyResult.isError) {
      toast.error("Something went wrong");
    }
  }, [removeReplyResult.isError]);

  useEffect(() => {
    (async () => {
      if (updateReplyResult.isSuccess) {
        toast.success("Reply updated successfully");
        updateReplyResult.reset();
        await onSave();
      }
    })();
  }, [updateReplyResult.isSuccess]);
  useEffect(() => {
    (async () => {
      if (removeReplyResult.isSuccess) {
        toast.success("Reply removed successfully");
        removeReplyResult.reset();
        await onSave();
      }
    })();
  }, [removeReplyResult.isSuccess]);

  return (
    <Box ml={4.5} mt={2}>
      <Box
        sx={{ svg: { cursor: "pointer" } }}
        display="flex"
        justifyContent="end"
      >
        <Box display="flex" gap={1} alignItems="center" mb={0.5}>
          {reply.userId === userId &&
            (isEditing ? (
              <CheckIcon onClick={() => handleUpdateReply()} />
            ) : (
              <PencilIcon onClick={() => setIsEditing(true)} />
            ))}

          {reply.userId === userId && (
            <Box
              display="flex"
              sx={{
                "svg:hover path": {
                  fill: (theme) => theme.palette.error.main,
                },
              }}
            >
              <TrashIcon onClick={() => handleRemoveReply()} />
            </Box>
          )}
          <Typography
            variant="caption"
            fontStyle="italic"
            color="text.secondary"
            lineHeight={1}
            fontSize={13}
          >
            {convertDate(reply.updatedAt)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1}>
        <Image
          style={{ borderRadius: "50%", marginTop: "8px" }}
          src={reply.userImage}
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
            {reply.userName}
          </Typography>
          <Typography
            ref={updateReplyRef}
            contentEditable={isEditing}
            sx={{ outline: "none" }}
            fontSize={15}
            color="text.secondary"
          >
            {reply.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Reply;
