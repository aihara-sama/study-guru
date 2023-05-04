import { Box, Button, Typography } from "@mui/material";
import type { Question as IQuestion, QuestionReply } from "@prisma/client";
import CheckIcon from "components/icons/CheckIcon";
import PencilIcon from "components/icons/PencilIcon";
import ReplyIcon from "components/icons/ReplyIcon";
import TrashIcon from "components/icons/TrashIcon";
import Image from "next/image";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from "services/questions";
import { useCreateQuestionReplyMutation } from "services/replies";

import convertDate from "utils/convert-date";
import focusElement from "utils/focusElement";
import Reply from "./Reply";

interface IQuestionProps {
  question: IQuestion & { reply: null | QuestionReply };
  userId: string;
  userImage: string;
  userName: string;
  lessonId: string;
  onSave: () => Promise<any>;
}

const Question: FunctionComponent<IQuestionProps> = ({
  question,
  onSave,
  userId,
  userImage,
  userName,
  lessonId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const updateQuestionRef = useRef<HTMLParagraphElement>(null);
  const replyQuestionRef = useRef<HTMLParagraphElement>(null);
  const [updateQuestion, updateQuestionResult] = useUpdateQuestionMutation();
  const [removeQuestion, removeQuestionResult] = useDeleteQuestionMutation();
  const [createReply, createReplyResult] = useCreateQuestionReplyMutation();
  const [replyTextContent, setReplyTextContent] = useState("");

  const handleUpdateNote = async () => {
    if (updateQuestionRef.current.textContent !== question.text) {
      try {
        await updateQuestion({
          questionId: question.id,
          text: updateQuestionRef.current.textContent,
          userImage,
          userId,
          userName,
        });
        updateQuestionResult.reset();
      } catch {
        toast.error("Something went wrong");
      }
    }
    setIsEditing(false);
  };

  const handleCreateReply = async () => {
    try {
      await createReply({
        questionId: question.id,
        text: replyTextContent,
        userImage,
        userId,
        userName,
        lessonId,
      });
    } catch {
      toast.error("Something went wrong");
    }
    setIsReplying(false);
  };
  const handleRemoveQuestion = async () => {
    setIsEditing(false);
    try {
      await removeQuestion({
        questionId: question.id,
        userId,
      });
      removeQuestionResult.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isEditing) {
      focusElement(updateQuestionRef.current);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isReplying) {
      replyQuestionRef.current?.focus();
    }
  }, [isReplying]);

  useEffect(() => {
    if (updateQuestionResult.isError) {
      toast.error("Something went wrong");
    }
  }, [updateQuestionResult.isError]);

  useEffect(() => {
    (async () => {
      if (updateQuestionResult.isSuccess) {
        toast.success("Question updated successfully");
        updateQuestionResult.reset();
        setReplyTextContent("");
        await onSave();
      }
    })();
  }, [updateQuestionResult.isSuccess]);

  useEffect(() => {
    if (createReplyResult.isError) {
      toast.error("Something went wrong");
    }
  }, [createReplyResult.isError]);

  useEffect(() => {
    (async () => {
      if (createReplyResult.isSuccess) {
        toast.success("Reply updated successfully");
        createReplyResult.reset();
        await onSave();
      }
    })();
  }, [createReplyResult.isSuccess]);

  useEffect(() => {
    if (removeQuestionResult.isError) {
      toast.error("Something went wrong");
    }
  }, [removeQuestionResult.isError]);

  useEffect(() => {
    (async () => {
      if (removeQuestionResult.isSuccess) {
        toast.success("Question removed successfully");
        removeQuestionResult.reset();
        await onSave();
      }
    })();
  }, [removeQuestionResult.isSuccess]);

  return (
    <Box>
      <Box
        sx={{ svg: { cursor: "pointer" } }}
        display="flex"
        justifyContent="end"
      >
        <Box display="flex" gap={1} alignItems="center" mb={0.5}>
          {question.userId === userId &&
            (isEditing ? (
              <CheckIcon onClick={() => handleUpdateNote()} />
            ) : (
              <PencilIcon onClick={() => setIsEditing(true)} />
            ))}
          {question.userId !== userId && question.reply === null && (
            <ReplyIcon onClick={() => setIsReplying(true)} />
          )}

          {question.userId === userId && (
            <Box
              display="flex"
              sx={{
                "svg:hover path": {
                  fill: (theme) => theme.palette.error.main,
                },
              }}
            >
              <TrashIcon onClick={() => handleRemoveQuestion()} />
            </Box>
          )}
          <Typography
            variant="caption"
            fontStyle="italic"
            color="text.secondary"
            lineHeight={1}
            fontSize={13}
          >
            {convertDate(question.updatedAt)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1}>
        <Image
          style={{ borderRadius: "50%", marginTop: "8px" }}
          src={question.userImage}
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
            {question.userName}
          </Typography>
          <Typography
            ref={updateQuestionRef}
            contentEditable={isEditing}
            sx={{ outline: "none" }}
            fontSize={15}
            color="text.secondary"
          >
            {question.text}
          </Typography>
        </Box>
      </Box>
      {isReplying && (
        <>
          <Box ml={4.5} mt={2} display="flex" gap={1}>
            <Image
              style={{ borderRadius: "50%", marginTop: "8px" }}
              src={question.userImage}
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
                You
              </Typography>
              <Typography
                // @ts-ignore
                onInput={(e) => setReplyTextContent(e.target.textContent)}
                ref={replyQuestionRef}
                contentEditable
                sx={{ outline: "none" }}
                fontSize={15}
                color="text.secondary"
              ></Typography>
            </Box>
          </Box>

          <Box mt={1} display="flex" justifyContent="end">
            <Button
              onClick={() => handleCreateReply()}
              disabled={replyTextContent.length === 0}
              variant="contained"
            >
              Reply
            </Button>
          </Box>
        </>
      )}
      {question.reply && (
        <Reply
          lessonId={lessonId}
          userName={userName}
          userId={userId}
          userImage={userImage}
          reply={question.reply}
          onSave={onSave}
        />
      )}
    </Box>
  );
};

export default Question;
