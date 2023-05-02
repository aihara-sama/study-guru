import type { Prisma, QuestionReply } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: QuestionReply | QuestionReply[];
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    const payload: Pick<Prisma.QuestionReplyCreateInput, "text"> = req.body;

    const lessonId = req.query["lesson-id"] as string;
    const userId = req.query["user-id"] as string;
    const questionId = req.query["question-id"] as string;
    const questionReplyText = payload.text as string;

    if (!lessonId || !userId || !questionId) {
      return res.status(400).json({ error: "Bad request" });
    }

    // GET
    if (req.method === "GET") {
      const questionReply = await prismaClient.questionReply.findMany({
        where: {
          lessonId,
          userId,
        },
        include: {
          question: true,
        },
      });
      return res.status(200).json({ data: questionReply });
    }
    // POST
    if (req.method === "POST") {
      const questionReply = await prismaClient.questionReply.create({
        data: { text: questionReplyText, userId, lessonId, questionId },
      });
      return res.status(200).json({ data: questionReply });
    }

    // NOT ALLOWED
    return res
      .status(405)
      .setHeader("Allow", ["GET", "POST"])
      .end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default handler;