import type { NextApiRequest, NextApiResponse } from "next";
import Equipment from "../../../../models/equip";
import connectMongoDB from "../../../../utils/database";

type SuccessResponse = {
  success: boolean;
  amount?: number;
};

type ErrorResponse = {
  error: string;
};

type Data = SuccessResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: { filterType } } = req;

  try {

    await connectMongoDB();

    let amount;

    switch (filterType) {
      case "available":
        amount = await Equipment.countDocuments({ status: "available" });
        break;
      case "in use":
        amount = await Equipment.countDocuments({ status: "in use" });
        break;
      case "maintenance":
        amount = await Equipment.countDocuments({ status: "maintenance" });
        break;
      case "out of service":
        amount = await Equipment.countDocuments({ status: "out of service" });
        break;
      case "all":
        amount = await Equipment.countDocuments();
        break;
      default:
        return res.status(400).json({ error: "Invalid filterType" });
    }

    return res.status(200).json({ success: true, amount });

  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
