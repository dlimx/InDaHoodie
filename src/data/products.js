import { designerData } from './designers';
import { categoryData } from './categories';

export const productData = [
  {
    id: 1,
    name: 'White T-Shirt',
    image: '',
    price: 20000,
    designer: designerData[0],
    categories: [categoryData[0]],
  },
  {
    id: 2,
    name: 'Goretex Jacket',
    image: '',
    price: 60000,
    categories: [categoryData[3]],
  },
  {
    id: 3,
    name: 'Grey Sweater',
    image: '',
    price: 33000,
    designer: designerData[1],
    categories: [categoryData[2]],
  },
  {
    id: 4,
    name: 'Heron Preston x InDaHoodie Joggers',
    image: '',
    price: 40000,
    designer: designerData[1],
    categories: [categoryData[2]],
  },
  {
    id: 5,
    name: 'InDaHoodie Hoodie',
    image: '',
    price: 15000,
    categories: [categoryData[2]],
  },
  {
    id: 6,
    name: 'InDaHoodie Tank',
    image: '',
    price: 5000,
    categories: [categoryData[0]],
  },
  {
    id: 7,
    name: 'Vera Wang x InDaHoodie Track Jacket',
    image: '',
    price: 45000,
    designer: designerData[4],
    categories: [categoryData[3]],
  },
];
