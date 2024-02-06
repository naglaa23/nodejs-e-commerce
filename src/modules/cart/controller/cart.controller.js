import Cart, { findByIdAndUpdate, findById } from '../../../../db/models/cart.model.js';
import { findOne } from '../../../../db/models/coupon.model.js'; // Assuming you have a Coupon model
import { validate } from 'joi';

const createCart = async (req, res) => {
  try {
    const cartData = req.body;
    const validationResult = cartValidationSchema.validate(cartData);
    
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const cart = new Cart(cartData);
    calculateTotalPriceAndDiscount(cart); 
    await cart.save();

    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartData = req.body;
    const validationResult = cartValidationSchema.validate(cartData);

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const updatedCart = await findByIdAndUpdate(cartId, cartData, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    calculateTotalPriceAndDiscount(updatedCart); 
    await updatedCart.save();

    return res.json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const couponData = req.body;
    const validationResult = couponValidationSchema.validate(couponData);

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const coupon = await findOne({ couponCode: couponData.couponCode });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    const cart = await findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const isCouponApplicable = checkCouponApplicability(cart.products, coupon);

    if (!isCouponApplicable) {
      return res.status(400).json({ error: 'Coupon is not applicable to the products in the cart' });
    }

    applyDiscountToCart(cart, coupon.discountPercentage);
    await cart.save();

    return res.json({ message: 'Coupon applied successfully', updatedCart: cart });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



const applyDiscountToCart = (cart, discountPercentage) => {
  cart.priceAfterDiscount = calculateDiscountedPrice(cart.totalPrice, discountPercentage);
  cart.couponApplied = {
    couponCode: coupon.couponCode,
    discountPercentage: coupon.discountPercentage
  };
};

const calculateTotalPriceAndDiscount = (cart) => {
  cart.totalPrice = cart.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  cart.priceAfterDiscount = cart.totalPrice;
};

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  return originalPrice - (originalPrice * discountPercentage / 100);
};

export default {
  createCart,
  updateCart,
};
