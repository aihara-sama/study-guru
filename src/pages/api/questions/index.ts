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
    const payload: Pick<Prisma.QuestionCreateInput, "text" | "userImage"> =
      req.body;

    const lessonId = req.query["lesson-id"] as string;
    const userId = req.query["user-id"] as string;
    const { userImage, text: questionText } = payload;

    if (!lessonId || !userId) {
      return res.status(400).json({ error: "Bad request" });
    }

    // GET
    if (req.method === "GET") {
      const question = await prismaClient.question.findMany({
        where: {
          lessonId,
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
        data: { text: questionText, userImage, userId, lessonId },
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
