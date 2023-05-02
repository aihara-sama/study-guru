import type { Prisma, Question } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Question;
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    // Question exists check
    const question = await prismaClient.question.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        reply: true,
      },
    });

    if (!question) {
      return res.status(404).json({ error: "Question Not Found" });
    }

    // GET
    if (req.method === "GET") {
      return res.status(200).json({ data: question });
    }
    // PATCH
    if (req.method === "PATCH") {
      const payload: Pick<Prisma.QuestionCreateInput, "id" | "text"> = req.body;

      const result = await prismaClient.question.update({
        where: {
          id: req.query.id as string,
        },
        data: payload,
        include: {
          reply: true,
        },
      });
      return res.status(200).json({ data: result });
    }
    // DELETE
    if (req.method === "DELETE") {
      const result = await prismaClient.question.delete({
        where: {
          id: req.query.id as string,
        },
        include: {
          reply: true,
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
