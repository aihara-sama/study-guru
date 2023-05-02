import type { Note, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Note | Note[];
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    const payload: Pick<
      Prisma.NoteCreateInput,
      "text" | "userId" | "lessonId"
    > = req.body;

    const lessonId = req.query["lesson-id"] as string;
    const userId = req.query["user-id"] as string;

    if (!lessonId || !userId) {
      return res.status(400).json({ error: "Bad request" });
    }

    // GET
    if (req.method === "GET") {
      const notes = await prismaClient.note.findMany({
        where: {
          lessonId,
          userId,
        },
      });
      return res.status(200).json({ data: notes });
    }
    // POST
    if (req.method === "POST") {
      const note = await prismaClient.note.create({
        data: payload,
      });
      return res.status(200).json({ data: note });
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
