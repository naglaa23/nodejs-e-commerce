import express from 'express';
import userRoutes from './user/user.routes.js';
import productRoutes from './product/product.routes.js';
import categoryRoutes from './category/category.routes.js';
import couponRoutes from './coupon/coupon.routes.js';



const mainRoutes = express.Router();

mainRoutes.use(userRoutes);
mainRoutes.use(productRoutes);
mainRoutes.use(categoryRoutes);
mainRoutes.use(couponRoutes);


export default mainRoutes