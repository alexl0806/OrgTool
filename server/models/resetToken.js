import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = mongoose.Schema({
    id: {type: Schema.Types.ObjectId, required: true, ref: "user",},
    token: {type: String, required: true,},
    createdAt: {type: Date, default: new Date(), expires: 3600,},
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;