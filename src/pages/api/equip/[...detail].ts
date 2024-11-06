import type { NextApiRequest, NextApiResponse } from "next";
import Equipment from "../../../models/equip";
import connectMongoDB from "../../../utils/database";

type SuccessResponse = {
  success: boolean;
};

type ErrorResponse = {
  error: string;
};

type EquipmentData = {
  eCode: string;
  eType: string;
  eName: string;
  purchaseDate: string;
  receiveDate?: string;
  createdDate?: string;
  modifiedDate?: string;
  status: string;
  eDetail: string;
};

type Data = SuccessResponse | ErrorResponse | EquipmentData[];

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
        const newEquip = new Equipment({
          eCode: detail[0],
          eType: detail[1],
          eName: detail[2],
          purchaseDate: detail[3],
          receiveDate: detail[4],
          createdDate: detail[5],
          modifiedDate: detail[6],
          status: detail[7],
          eDetail: detail[8],
        });
        const resultPost = await newEquip.save();
        if (resultPost) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(500).json({ error: "Failed to save equipment" });
        }

      case "PUT":
        const resultPut = await Equipment.updateOne({
          eCode: detail[0]
        }, {
          eCode: detail[0], eType: detail[1],
          eName: detail[2],
          purchaseDate: detail[3],
          receiveDate: detail[4],
          modifiedDate: detail[6],
          status: detail[7],
          eDetail: detail[8],
        });
        if (resultPut.modifiedCount) {
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