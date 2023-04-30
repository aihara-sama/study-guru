import type { NextApiRequest, NextApiResponse } from "next";

interface IResponseData {
  text: string;
}

const handler = (_: NextApiRequest, res: NextApiResponse<IResponseData>) => {
  res.status(200).json({ text: "Hello" });
};

export default handler;
