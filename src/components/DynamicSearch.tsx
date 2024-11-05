import { useState, ChangeEvent, FormEvent } from "react";

interface DynamicSearchProps {
    onSearch: (data: { searchType: string, searchValue: string }) => void;
}

const DynamicSearch: React.FC<DynamicSearchProps> = ({ onSearch }) => {

    const [searchType, setSearchType] = useState<string>("ทั้งหมด");
    const [searchValue, setSearchValue] = useState<string>("");

    const handleFilterSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.value;
        setSearchType(selectValue);

        if (selectValue === "ทั้งหมด") {
            onSearch({ searchType: selectValue, searchValue: "" });
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchType !== "ทั้งหมด") {
            onSearch({ searchType: searchType, searchValue: searchValue });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <h1 className="text-2xl font-bold">ติดตามอุปกรณ์</h1>
            <div className="flex gap-10 items-center">
                <div className="mb-4">
                    <label htmlFor="searchType" className="block text-sm font-medium">ค้นหาตาม</label>
                    <select
                        id="searchType"
                        value={searchType}
                        onChange={handleFilterSelectValue}
                        className="mt-1 p-2 w-full border rounded"
                    >
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="รหัส">รหัส</option>
                        <option value="วันที่ซื้อ">วันที่ซื้อ</option>
                        <option value="วันที่รับ">วันที่รับ</option>
                        <option value="วันที่สร้าง">วันที่สร้าง</option>
                        <option value="ประเภท">ประเภท</option>
                    </select>
                </div>

                {searchType !== "ทั้งหมด" && (
                    <div className="mb-4">
                        <label htmlFor="searchValue" className="block text-sm font-medium">
                            {searchType === "รหัส" && "ใส่รหัสอุปกรณ์"}
                            {["วันที่ซื้อ", "วันที่รับ", "วันที่สร้าง"].includes(searchType) && "เลือกวันที่"}
                            {searchType === "ประเภท" && "ใส่ประเภทอุปกรณ์"}
                        </label>
                        {searchType === "รหัส" && (
                            <input
                                type="text"
                                id="searchValue"
                                name="searchValue"
                                value={searchValue}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        )}
                        {["วันที่ซื้อ", "วันที่รับ", "วันที่สร้าง"].includes(searchType) && (
                            <input
                                type="date"
                                id="searchValue"
                                name="searchValue"
                                value={searchValue}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        )}
                        {searchType === "ประเภท" && (
                            <input
                                type="text"
                                id="searchValue"
                                name="searchValue"
                                value={searchValue}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        )}
                    </div>
                )}

                {searchType !== "ทั้งหมด" && (
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
                        ค้นหา
                    </button>
                )}
            </div>
        </form>
    );
};

export default DynamicSearch;
