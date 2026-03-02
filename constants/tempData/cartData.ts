export const DELIVERY_FEE = 10;
export const PLATFORM_FEE_PERCENTAGE = 5;

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Jollof Rice',
    restaurant: "Mama's Kitchen",
    price: 22,
    quantity: 1,
    size: 'Regular',
    image: 'https://dummyimage.com/96x96/000/fff.png',
  },
];

const SAMPLE_CART_ITEMS = [
  {
    id: 1,
    name: 'Jollof Rice',
    restaurant: "Mama's Kitchen",
    price: 22,
    quantity: 1,
    size: 'Regular',
    image: 'https://dummyimage.com/96x96/000/fff.png',
  },
  {
    id: 2,
    name: 'Waakye Special',
    restaurant: "Mama's Kitchen",
    price: 18,
    quantity: 2,
    size: 'Regular',
    image: 'https://dummyimage.com/96x96/000/fff.png',
  },
];

export default { INITIAL_CART_ITEMS, SAMPLE_CART_ITEMS };
