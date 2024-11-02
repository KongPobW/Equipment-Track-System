import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../utils/database";
import User from "../../../models/user";

type Data = {
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {

    await connectMongoDB();
    const { detail } = req.query;

    if (!Array.isArray(detail)) {
      return res.status(400).json({ error: "Invalid detail format" });
    }

    switch (req.method) {
      case "POST":
        const newUser = new User({
          username: detail[0],
          password: detail[1],
        });
        const resultPost = await newUser.save();
        if (resultPost) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(500).json({ success: false });
        }

      default:
        return res.status(405).json({ error: "Method Not Allowed" });
    }

  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
