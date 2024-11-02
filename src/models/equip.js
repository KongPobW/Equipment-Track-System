import mongoose, { Schema } from "mongoose";

const equipSchema = new Schema({
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
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    eDetail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Equip = mongoose.models.Equip || mongoose.model("Equip", equipSchema);

export default Equip;