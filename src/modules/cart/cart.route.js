import { Router } from 'express';
const routerCart = Router();
import { createCart, updateCart, applyCoupon } from '../cart/controller/';
import cartValidationSchema from ''
import { auth } from '../../middlewares/auth';

routerCart.post('/create',auth, createCart);
routerCart.put('/update/:cartId',auth, updateCart);
// routerCart.post('/apply-coupon/:cartId', applyCoupon);

export default routerCart;

