import type { Prisma, Question } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Question | Question[];
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    const payload: Pick<Prisma.QuestionCreateInput, "text"> = req.body;

    const lessonId = req.query["lesson-id"] as string;
    const userId = req.query["user-id"] as string;
    const questionText = payload.text as string;

    if (!lessonId || !userId) {
      return res.status(400).json({ error: "Bad request" });
    }

    // GET
    if (req.method === "GET") {
      const question = await prismaClient.question.findMany({
        where: {
          lessonId,
          userId,
        },
        include: {
          reply: true,
        },
      });
      return res.status(200).json({ data: question });
    }
    // POST
    if (req.method === "POST") {
      const question = await prismaClient.question.create({
        data: { text: questionText, userId, lessonId },
      });
      return res.status(200).json({ data: question });
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
