import { getCurrentDate } from "../utils/date";

class EquipmentManager {

    // static async getAll() {
    //     const res = await fetch(`/api/note/${username}`, {
    //         method: "GET"
    //     });

    //     if (res.ok) {
    //         return await res.json();
    //     } else {
    //         return null;
    //     }
    // }

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

    // static async edit(id, title, content) {
    //     if (!id || !title || !content) {
    //         throw new Error("id, title, and content are undefined");
    //     }

    //     const result = await fetch(`/api/note/${id}/${title}/${content}/${getCurrentDate()}`, {
    //         method: "PUT"
    //     });

    //     if (result.ok) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // static async delete(id) {
    //     if (!id) {
    //         throw new Error("id is undefined");
    //     }

    //     const result = await fetch(`/api/note/${id}`, {
    //         method: "DELETE"
    //     });

    //     if (result.ok) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

export default EquipmentManager;