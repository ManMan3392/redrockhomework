export const formatPrice = (price: number) => {
  return price.toFixed(2);
}

export const formatPriceCNY = (price: number) => {
  return `¥${price.toFixed(2)}`;
}
