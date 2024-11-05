import type { NextApiRequest, NextApiResponse } from "next";
import Equipment from "../../../models/equip";
import connectMongoDB from "../../../utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB();
    const { detail } = req.query;

    if (!Array.isArray(detail)) {
        return res.status(400).json({ error: "Invalid detail format" });
    }

    try {

        let results;

        if (detail[0] === "รหัส") {
            results = await Equipment.find({ eCode: detail[1] });
        } else if (detail[0] === "วันที่ซื้อ") {
            results = await Equipment.find({ purchaseDate: detail[1] });
        } else if (detail[0] === "วันที่รับ") {
            results = await Equipment.find({ receiveDate: detail[1] });
        } else if (detail[0] === "วันที่สร้าง") {
            results = await Equipment.find({ createdDate: detail[1] });
        } else if (detail[0] === "ประเภท") {
            results = await Equipment.find({ eType: detail[1] });
        }

        res.status(200).json(results);

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
