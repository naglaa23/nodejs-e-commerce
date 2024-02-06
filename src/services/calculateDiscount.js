export const calculateDiscountedPrice = (price, percentage) => {
    if (percentage < 100 && percentage > 0) {
      const discountAmount = price * (percentage / 100);
      const priceAfterDiscount = price - discountAmount;
      return priceAfterDiscount;
    } else {
      return "Enter a valid percentage";
    }
  };
  