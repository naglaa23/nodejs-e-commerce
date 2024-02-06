import categoryModel from "../../../../db/models/category.model.js";
import userModel from "../../../../db/models/user.model.js";
//-------------------getCategories-------------------------------//
export const getCategories = async (req, res) => {
  const { categoryName } = req.body;
  if (categoryName) {
    const foundedCategory = await categoryModel.find({ categoryName });
    return res.send({ founded: foundedCategory });
  } else {
    const categories = await categoryModel.find();
    res.send({ categories: categories });
  }
};
//----------------------addCategory----------------------------//
export const addCategory = async (req, res) => {
  const { categoryName, image } = req.body;
  const createdBy = req.userId;
  const foundedCategory = await categoryModel.findOne({
    categoryName: categoryName,
  });
  if (foundedCategory) return res.send({ message: "category already exists" });
  const newCategory = await categoryModel.insertMany({
    categoryName,
    image,
    createdBy,
  });
  res.send({ message: "category created", category: newCategory });
};
//----------------------updateCategory----------------------------//

export const updateCategory = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(req.userId);
  const foundedCategory = await categoryModel.findById(id);
  if (!foundedCategory) return res.json({ message: "category not found" });
  if (foundedCategory) {
    if (user._id.equals(foundedCategory.createdBy) || user.role == "admin") {
      const { categoryName, image } = req.body;
      await categoryModel.findByIdAndUpdate(id, {
        categoryName,
        image,
      });

      const updatedCategory = await categoryModel.findById(id);
      res.json({ message: "updated", category: updatedCategory });
    } else {
      res.json({ message: " cant update" });
    }
  }
};
