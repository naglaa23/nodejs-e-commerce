import express from "express";
import { addCategory,getCategories,updateCategory,} from "./controller/category.controller.js";
import { auth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { categorySchema, updateCategorySchema } from "./category.validation.js";
const categoryRoutes = express.Router();

categoryRoutes.get("/category", getCategories);

categoryRoutes.post("/category", auth, validate(categorySchema), addCategory);

categoryRoutes.patch(
  "/category/:id",
  auth,
  validate(updateCategorySchema),
  updateCategory
);

export default categoryRoutes;
