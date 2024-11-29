import DynamicSearchForm from "@/components/DynamicSearch";
import SideBarLayout from "@/components/layout/SideBarLayout";
import EquipmentManager from "@/utils/equip";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEdit, FaCheckCircle, FaTools, FaWrench, FaBan, FaArrowUp, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EquipmentData {
  eCode: string;
  eType: string;
  eName: string;
  purchaseDate: string;
  receiveDate: string;
  createdDate: string;
  modifiedDate: string;
  status: string;
  eDetail: string;
}

function TrackEquipment() {
  const [equips, setEquips] = useState<EquipmentData[]>([]);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const router = useRouter();

  const refreshEquips = async () => {
    const equipsData = await EquipmentManager.getAll();
    if (equipsData) {
      setEquips(equipsData);
    }
  };

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
          const result: EquipmentData[] = await response.json();
          setEquips(result);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEdit = (item: EquipmentData) => {
    router.push({
      pathname: "/edit-equip",
      query: {
        equip: JSON.stringify(item),
      },
    });
  };

  const handleDelete = async (eCode: string) => {
    const isSuccess = await EquipmentManager.delete(eCode);
    if (isSuccess) {
      toast.success("Successfully deleting equipment");
    } else {
      toast.error("Failed to delete equipment");
    }
    refreshEquips();
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  useEffect(() => {
    if (!localStorage.getItem("equip-track-user")) {
      router.replace("/sign-in");
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      <div className="w-full px-4 md:px-8 lg:px-20 xl:px-44 my-4 md:my-6 lg:my-8">
        <h1 className="text-2xl font-bold">ติดตามอุปกรณ์</h1>
        <DynamicSearchForm onSearch={handleSearch} />
        {equips.length > 0 ? (
          <div className="mt-8 overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รหัส</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ประเภท</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ชื่อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รายละเอียด</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่ซื้อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่รับ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่สร้าง</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่แก้ไข</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">สถานะ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">แก้ไข</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {equips.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-4 py-2 border-b text-gray-600">{item.eCode}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.eType}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.eName}</td>
                      <td className="px-4 py-2 border-b text-gray-600">{item.eDetail}</td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        {item.purchaseDate === "null" ? "-" : item.purchaseDate}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        {item.receiveDate === "null" ? "-" : item.receiveDate}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        {item.createdDate === "null" ? "-" : item.createdDate}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        {item.modifiedDate === "null" ? "-" : item.modifiedDate}
                      </td>
                      <td className="px-4 py-2 border-b text-center text-gray-600">
                        {getStatusIcon(item.status)}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        <button
                          className="text-blue-500 hover:text-blue-700 flex justify-start"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="px-4 py-2 border-b text-gray-600">
                        <button
                          className="text-red-500 hover:text-red-700 flex justify-start"
                          onClick={() => handleDelete(item.eCode)}
                        >
                          <FaTrash />
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
            <div className="inline-block min-w-full">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รหัส</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ประเภท</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ชื่อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">รายละเอียด</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่ซื้อ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่รับ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่สร้าง</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">วันที่แก้ไข</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">สถานะ</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">แก้ไข</th>
                    <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={11} className="px-4 py-2 border-b text-center text-gray-600">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-4 right-4 bg-blue-500 p-3 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}

      <ToastContainer />
    </SideBarLayout>
  );
}

export default TrackEquipment;