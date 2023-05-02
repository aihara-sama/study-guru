import type { Note, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Note;
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    // Note exists check
    const note = await prismaClient.note.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note Not Found" });
    }

    // GET
    if (req.method === "GET") {
      return res.status(200).json({ data: note });
    }
    // PATCH
    if (req.method === "PATCH") {
      const payload: Pick<Prisma.NoteCreateInput, "id" | "text"> = req.body;

      const result = await prismaClient.note.update({
        where: {
          id: req.query.id as string,
        },
        data: payload,
      });
      return res.status(200).json({ data: result });
    }
    // DELETE
    if (req.method === "DELETE") {
      const result = await prismaClient.note.delete({
        where: {
          id: req.query.id as string,
        },
      });
      return res.status(200).json({ data: result });
    }

    // NOT ALLOWED
    return res
      .status(405)
      .setHeader("Allow", ["GET", "PATCH", "DELETE"])
      .end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default handler;
