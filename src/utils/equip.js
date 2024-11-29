import { getCurrentDate } from "../utils/date";

export const FilterType = {
    all: "all",
    available: "available",
    inUse: "in use",
    maintenance: "maintenance",
    outOfService: "out of service",
};

class EquipmentManager {

    static async getAll() {
        const response = await fetch("/api/equip/get-all", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }

    static async add(formData) {
        let { eCode, eType, eName, purchaseDate, receiveDate, status, eDetail } = formData;

        if (receiveDate === "") {
            receiveDate = "null";
        }

        const response = await fetch(`/api/equip/${eCode}/${eType}/${eName}/${purchaseDate}/${receiveDate}/${getCurrentDate()}/${getCurrentDate()}/${status}/${eDetail}`, {
            method: "POST",
        });

        return response.ok;
    }

    static async edit(formData) {
        let { eCode, eType, eName, purchaseDate, receiveDate, createdDate, status, eDetail } = formData;

        const response = await fetch(`/api/equip/${eCode}/${eType}/${eName}/${purchaseDate}/${receiveDate}/${createdDate}/${getCurrentDate()}/${status}/${eDetail}`, {
            method: "PUT"
        });

        return response.ok;
    }

    static async delete(eCode) {
        const response = await fetch(`/api/equip/${eCode}`, {
            method: "DELETE"
        });

        return response.ok;
    }

    static async getAmount(filterType) {
        if (!filterType && !Object.values(FilterType).includes(filterType)) {
            throw new Error("filterType is undefined or wrong type");
        }

        let response;

        if (filterType === "all") {
            response = await fetch(`/api/equip/amount/${filterType}`, {
                method: "GET"
            });
        } else if (filterType === "available") {
            response = await fetch(`/api/equip/amount/${filterType}`, {
                method: "GET"
            });
        } else if (filterType === "in use") {
            response = await fetch(`/api/equip/amount/${filterType}`, {
                method: "GET"
            });
        } else if (filterType === "maintenance") {
            response = await fetch(`/api/equip/amount/${filterType}`, {
                method: "GET"
            });
        } else if (filterType === "out of service") {
            response = await fetch(`/api/equip/amount/${filterType}`, {
                method: "GET"
            });
        }

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }
}

export default EquipmentManager;