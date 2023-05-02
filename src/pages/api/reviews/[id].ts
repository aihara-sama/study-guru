import type { Prisma, Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "services/prisma";

interface IResponseSuccessData {
  data: Review;
}
interface IResponseFailureData {
  error: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponseSuccessData | IResponseFailureData>
) => {
  try {
    // Review exists check
    const review = await prismaClient.review.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Review Not Found" });
    }

    // GET
    if (req.method === "GET") {
      return res.status(200).json({ data: review });
    }
    // PATCH
    if (req.method === "PATCH") {
      const payload: Pick<Prisma.ReviewCreateInput, "id" | "text"> = req.body;

      const result = await prismaClient.review.update({
        where: {
          id: req.query.id as string,
        },
        data: payload,
      });
      return res.status(200).json({ data: result });
    }
    // DELETE
    if (req.method === "DELETE") {
      const result = await prismaClient.review.delete({
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
