import SidebarLayout from "@/components/layout/SideBarLayout";
import EquipmentForm, { FormData, PageForm } from "@/components/EquipmentForm";
import React, { useEffect } from "react";
import EquipmentManager from "../../utils/equip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const AddEquip = () => {

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

    useEffect(() => {
        if (!localStorage.getItem("equip-track-user")) {
            router.replace("/sign-in");
        }
    }, []);

    return (
        <SidebarLayout>
            <div className="px-4 md:px-8 lg:px-20 xl:px-44 mt-4 md:mt-6 lg:mt-8">
                <EquipmentForm mode={PageForm.ADD} onSubmit={handleSubmit} />
            </div>
            <ToastContainer />
        </SidebarLayout>
    );
};

export default AddEquip;