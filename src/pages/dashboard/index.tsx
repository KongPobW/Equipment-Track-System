import SideBarLayout from "@/components/layout/SideBarLayout";
import EquipmentManager, { FilterType } from "@/utils/equip";
import React, { useEffect, useState } from "react";

type DashBoardDataType = {
  amountAll: number;
  amountAvailable: number;
  amountInUse: number;
  amountMaintenance: number;
  amountOutOfService: number;
};

function DashBoard() {

  const [dashBoardData, setDashBoardData] = useState<DashBoardDataType>();

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
      <div className="bg-slate-100 w-full px-44 mt-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-5 gap-12">

          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-8">อุปกรณ์ทั้งหมด</h2>
            <p className="text-4xl">{dashBoardData.amountAll}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-8">พร้อมใช้งาน</h2>
            <p className="text-4xl">{dashBoardData.amountAvailable}</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-8">กำลังใช้งาน</h2>
            <p className="text-4xl">{dashBoardData.amountInUse}</p>
          </div>

          <div className="bg-orange-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-8">บำรุงรักษา</h2>
            <p className="text-4xl">{dashBoardData.amountMaintenance}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-8">ใช้งานไม่ได้</h2>
            <p className="text-4xl">{dashBoardData.amountOutOfService}</p>
          </div>

        </div>
      </div>
    </SideBarLayout>
  );
}

export default DashBoard;
