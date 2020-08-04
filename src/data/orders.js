import { productData } from './products';
import { customerData } from './customers';

export const orderData = [
  {
    id: 1,
    customer: customerData[0],
    products: [
      { product: productData[0], quantity: 4 },
      { product: productData[2], quantity: 1 },
    ],
    created_at: new Date(),
    shipment_method: 'FedEx',
  },
  {
    id: 2,
    customer: customerData[1],
    products: [
      { product: productData[2], quantity: 2 },
      { product: productData[1], quantity: 1 },
    ],
    created_at: new Date(),
    shipment_method: 'Pickup',
  },
];
