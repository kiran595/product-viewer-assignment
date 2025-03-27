export const sumFromArray = (propertyName: string, array: any[]) => {
  let sum = 0;
  array.forEach((item) => {
    sum += parseFloat(item[propertyName]) ?? 0;
  });
  return sum;
};

export const stockStatus = (availabilityStatus: string) => {
  if (availabilityStatus?.toLowerCase() === 'low stock') {
    return 'Limited Stock';
  } else if (availabilityStatus?.toLowerCase() === 'in stock') {
    return 'Stock Available';
  }
};

export const calculateDiscount = (
  orgPrice: number,
  discountPercent: number
) => {
  const discountedAmount = orgPrice * (discountPercent / 100);

  const discountedPrice = orgPrice - discountedAmount;

  return discountedPrice?.toFixed(2);
};
