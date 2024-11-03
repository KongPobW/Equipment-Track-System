import mongoose, { Schema } from "mongoose";

const equipmentSchema = new Schema({
    eCode: {
        type: String,
        required: true
    },
    eType: {
        type: String,
        required: true
    },
    eName: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String,
        required: true
    },
    receiveDate: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    modifiedDate: {
        type: String,
        required: true
    },
    eDetail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

const Equipment = mongoose.models.Equipment || mongoose.model("Equipment", equipmentSchema);

export default Equipment;