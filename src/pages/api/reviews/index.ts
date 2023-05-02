import type { Prisma, Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Review | Review[];
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    const payload: Pick<Prisma.NoteCreateInput, "text"> = req.body;

    const lessonId = req.query["lesson-id"] as string;
    const userId = req.query["user-id"] as string;
    const reviewText = payload.text as string;

    if (!lessonId || !userId) {
      return res.status(400).json({ error: "Bad request" });
    }

    // GET
    if (req.method === "GET") {
      const reviews = await prismaClient.review.findMany({
        where: {
          lessonId,
          userId,
        },
      });
      return res.status(200).json({ data: reviews });
    }
    // POST
    if (req.method === "POST") {
      const review = await prismaClient.review.create({
        data: { text: reviewText, userId, lessonId },
      });
      return res.status(200).json({ data: review });
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
