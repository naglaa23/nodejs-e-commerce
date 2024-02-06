import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  categoryName: String,
  image: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
//----------------categoryModel-------------//
const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
