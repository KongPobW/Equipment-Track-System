import SidebarLayout from "@/components/layout/SideBarLayout";
import EquipmentForm, { FormData, PageForm } from "@/components/EquipmentForm";
import React from "react";
import EquipmentManager from "../../utils/equip";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEquip: React.FC = () => {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        try {
            const isSuccess: boolean = await EquipmentManager.add(formData);

            if (isSuccess) {
                toast.success("Successfully adding equipment");
            } else {
                toast.error("Failed to add equipment");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again");
        }
    };

    return (
        <SidebarLayout>
            <div className="bg-slate-100 w-full px-44 mt-8">
                <EquipmentForm mode={PageForm.ADD} onSubmit={handleSubmit} />
            </div>
            <ToastContainer />
        </SidebarLayout>
    );
}

export default AddEquip;
