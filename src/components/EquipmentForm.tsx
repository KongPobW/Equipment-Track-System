import Image from "next/image";
import React, { useEffect, useState } from "react";
import resetIcon from "../../public/reset.svg";

export interface FormData {
    eCode: string;
    eType: string;
    eName: string;
    purchaseDate: string;
    receiveDate: string;
    createdDate?: string;
    modifiedDate?: string;
    status: string;
    eDetail: string;
}

export enum PageForm {
    ADD, EDIT
};

interface EquipmentFormProps {
    onSubmit: (data: FormData) => void;
    initialData?: FormData;
    mode: PageForm;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onSubmit, initialData, mode }) => {

    const initialFormData: FormData = {
        eCode: "",
        eType: "",
        eName: "",
        purchaseDate: "",
        receiveDate: "",
        status: "",
        eDetail: "",
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    useEffect(() => {
        if (mode === PageForm.EDIT && initialData) {
            setFormData(initialData);
        }
    }, [initialData, mode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{mode === PageForm.EDIT ? "แก้ไขอุปกรณ์" : "เพิ่มอุปกรณ์"}</h1>
                <div className="flex gap-6 items-center">
                    <Image
                        src={resetIcon}
                        width={20}
                        height={20}
                        alt="reset-icon"
                        onClick={handleReset}
                        className="cursor-pointer"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer"
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
            <div className="w-full bg-inherit space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">รหัสอุปกรณ์</label>
                        <input
                            type="text"
                            name="eCode"
                            placeholder="รหัสอุปกรณ์"
                            value={formData.eCode}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">ประเภทอุปกรณ์</label>
                        <input
                            type="text"
                            name="eType"
                            placeholder="ประเภทอุปกรณ์"
                            value={formData.eType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">ชื่ออุปกรณ์</label>
                        <input
                            type="text"
                            name="eName"
                            placeholder="ชื่ออุปกรณ์"
                            value={formData.eName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">สถานะ</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>
                                เลือกสถานะ
                            </option>
                            <option value="available">พร้อมใช้งาน</option>
                            <option value="in use">กำลังใช้งาน</option>
                            <option value="maintenance">บำรุงรักษา</option>
                            <option value="out of service">ใช้งานไม่ได้</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">วันที่ซื้อ</label>
                        <input
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">วันที่รับ</label>
                        <input
                            type="date"
                            name="receiveDate"
                            value={formData.receiveDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">รายละเอียดอุปกรณ์</label>
                    <textarea
                        name="eDetail"
                        placeholder="รายละเอียดอุปกรณ์"
                        value={formData.eDetail}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </form>
    );
};

export default EquipmentForm;