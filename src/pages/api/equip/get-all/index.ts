import type { NextApiRequest, NextApiResponse } from "next";
import Equipment from "../../../../models/equip";
import connectMongoDB from "../../../../utils/database";

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

        const equips = await Equipment.find({});
        return res.status(200).json(equips);

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
