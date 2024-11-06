import SideBarLayout from "@/components/layout/SideBarLayout";
import EquipmentManager, { FilterType } from "@/utils/equip";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type DashBoardData = {
  amountAll: number;
  amountAvailable: number;
  amountInUse: number;
  amountMaintenance: number;
  amountOutOfService: number;
};

function DashBoard() {

  const [dashBoardData, setDashBoardData] = useState<DashBoardData>();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("equip-track-user")) {
      router.replace("/sign-in");
    }
  }, []);

  useEffect(() => {
    const fetchAmount = async () => {
      const amountAll = await EquipmentManager.getAmount(FilterType.all);
      const amountAvailable = await EquipmentManager.getAmount(FilterType.available);
      const amountInUse = await EquipmentManager.getAmount(FilterType.inUse);
      const amountMaintenance = await EquipmentManager.getAmount(FilterType.maintenance);
      const amountOutOfService = await EquipmentManager.getAmount(FilterType.outOfService);

      if (amountAll && amountAvailable && amountInUse && amountMaintenance && amountOutOfService) {
        setDashBoardData({ amountAll: amountAll.amount, amountAvailable: amountAvailable.amount, amountInUse: amountInUse.amount, amountMaintenance: amountMaintenance.amount, amountOutOfService: amountOutOfService.amount });
      }
    };

    fetchAmount();
  }, []);

  if (!dashBoardData) {
    return <p>Loading...</p>;
  }

  return (
    <SideBarLayout>
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-44 mt-4 md:mt-6 lg:mt-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-10">

          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 lg:mb-8">อุปกรณ์ทั้งหมด</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">{dashBoardData.amountAll}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded shadow">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 lg:mb-8">พร้อมใช้งาน</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">{dashBoardData.amountAvailable}</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 lg:mb-8">กำลังใช้งาน</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">{dashBoardData.amountInUse}</p>
          </div>

          <div className="bg-orange-500 text-white p-4 rounded shadow">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 lg:mb-8">บำรุงรักษา</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">{dashBoardData.amountMaintenance}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded shadow">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 lg:mb-8">ใช้งานไม่ได้</h2>
            <p className="text-2xl md:text-3xl lg:text-4xl">{dashBoardData.amountOutOfService}</p>
          </div>

        </div>
      </div>
    </SideBarLayout>
  );
}

export default DashBoard;