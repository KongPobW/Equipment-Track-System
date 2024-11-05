import SidebarLayout from "@/components/layout/SideBarLayout";
import EquipmentForm, { FormData, PageForm } from "@/components/EquipmentForm";
import React from "react";
import EquipmentManager from "../../utils/equip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const EditEquip: React.FC = () => {

    const router = useRouter();
    const { equip } = router.query;

    const initialEquip = equip ? JSON.parse(equip as string) : null;

    const handleSubmit = async (formData: FormData) => {
        try {
            const isSuccess: boolean = await EquipmentManager.edit(formData);

            if (isSuccess) {
                toast.success("Successfully editing equipment");
            } else {
                toast.error("Failed to edit equipment");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again");
        }
    };

    return (
        <SidebarLayout>
            <div className="bg-slate-100 w-full px-44 mt-8">
                <EquipmentForm mode={PageForm.EDIT} onSubmit={handleSubmit} initialData={initialEquip} />
            </div>
            <ToastContainer />
        </SidebarLayout>
    );
}

export default EditEquip