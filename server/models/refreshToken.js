import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    default: uuidv4(),
  },
  user: mongoose.Schema.Types.ObjectId,
  expiryDate: {
    type: Date,
    default: new Date().setHours(new Date().getHours() + 1),
  },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
