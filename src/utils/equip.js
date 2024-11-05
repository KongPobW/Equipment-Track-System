import { getCurrentDate } from "../utils/date";

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
}

export default EquipmentManager;