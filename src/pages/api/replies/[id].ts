import type { Prisma, QuestionReply } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: QuestionReply;
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    // Question Reply exists check
    const questionReply = await prismaClient.questionReply.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        question: true,
      },
    });

    if (!questionReply) {
      return res.status(404).json({ error: "Question Reply Not Found" });
    }

    // GET
    if (req.method === "GET") {
      return res.status(200).json({ data: questionReply });
    }
    // PATCH
    if (req.method === "PATCH") {
      // Check permissions
      if (questionReply.userId !== (req.query["user-id"] as string)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      const payload: Pick<
        Prisma.QuestionReplyUpdateInput,
        "text" | "userImage" | "userName"
      > = req.body;

      const result = await prismaClient.questionReply.update({
        where: {
          id: req.query.id as string,
        },
        include: {
          question: true,
        },
        data: payload,
      });
      return res.status(200).json({ data: result });
    }
    // DELETE
    if (req.method === "DELETE") {
      // Check permissions
      if (questionReply.userId !== (req.query["user-id"] as string)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      const result = await prismaClient.questionReply.delete({
        where: {
          id: req.query.id as string,
        },
        include: {
          question: true,
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
