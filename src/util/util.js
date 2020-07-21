export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const getPrice = (price) => {
  return `${Math.floor(price / 100)}.${
    price % 100 > 9 ? price % 100 : `0${price % 100}`
  }`;
};

export const getTotalQuantity = (items = []) => {
  return items.reduce(
    (accum, orderProduct) => orderProduct.quantity + accum,
    0,
  );
};
