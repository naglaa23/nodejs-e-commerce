import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
});

const userSchema = mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
