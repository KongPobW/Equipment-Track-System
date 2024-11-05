import DynamicSearchForm from "@/components/DynamicSearch";
import SideBarLayout from "@/components/layout/SideBarLayout";
import EquipmentManager from "@/utils/equip";
import React, { useEffect, useState } from "react";
import { FaEdit, FaCheckCircle, FaTools, FaWrench, FaBan } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Equipment {
  eCode: string;
  eType: string;
  eName: string;
  purchaseDate: string;
  status: string;
  eDetail: string;
}

function TrackEquipment() {

  const [equips, setEquips] = useState<Equipment[]>([]);

  const handleSearch = async (data: { searchType: string, searchValue: string }) => {
    try {

      if (data.searchType === "ทั้งหมด") {
        const equipsData = await EquipmentManager.getAll();

        if (equipsData) {
          setEquips(equipsData);
        }

      } else {
        const response = await fetch(`/api/search/${data.searchType}/${data.searchValue}`);
        if (response.ok) {
          const result: Equipment[] = await response.json();
          setEquips(result);
        }
      }

    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchEquips = async () => {
      const equipsData = await EquipmentManager.getAll();

      if (equipsData) {
        setEquips(equipsData);
      }
    };

    fetchEquips();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return <FaCheckCircle className="text-green-500" title="Available" />;
      case "in use":
        return <FaTools className="text-blue-500" title="In Use" />;
      case "maintenance":
        return <FaWrench className="text-yellow-500" title="Maintenance" />;
      case "out of service":
        return <FaBan className="text-red-500" title="Out of Service" />;
      default:
        return <span className="text-gray-500">-</span>;
    }
  };

  if (!equips) {
    return <p>Loading...</p>;
  }

  return (
    <SideBarLayout>
      <div className="bg-slate-100 w-full px-44 mt-8">
        <DynamicSearchForm onSearch={handleSearch} />
        {equips.length > 0 ? (
          <div className="mt-8 overflow-x-auto">
            <div className="inline-block min-w-[60%]">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รหัส</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ประเภท</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ชื่อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่ซื้อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">สถานะ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {equips.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-4 py-2 border-b text-gray-600">{item.eCode}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.eType}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.eName}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.purchaseDate}</td>
                      <td className="px-4 py-2 border-b text-center text-gray-600">
                        {getStatusIcon(item.status)}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        <button className="text-blue-500 hover:text-blue-700 flex justify-start">
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <div className="inline-block min-w-[60%]">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รหัส</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ประเภท</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ชื่อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่ซื้อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">สถานะ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b text-gray-600">N/A</td>
                    <td className="px-4 py-2 border-b text-gray-600">N/A</td>
                    <td className="px-4 py-2 border-b text-gray-600">N/A</td>
                    <td className="px-4 py-2 border-b text-gray-600">N/A</td>
                    <td className="px-4 py-2 border-b text-center text-gray-600">N/A</td>
                    <td className="px-4 py-2 border-b text-gray-600">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </SideBarLayout>
  );
}

export default TrackEquipment;