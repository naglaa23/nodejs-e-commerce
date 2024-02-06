import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  priceAfterDiscount: {
    type: Number,
    default: 0
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

const Cart = model('Cart', cartSchema);

export default Cart;
