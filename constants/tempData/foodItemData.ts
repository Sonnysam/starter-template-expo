const foodItemData = {
  name: 'Waakye Special',
  description: 'Rice and beans with spaghetti, gari, egg, wele, and shito',
  image: 'https://dummyimage.com/443x224/000/fff.png',
  isPopular: true,
  restaurant: "Mama's Kitchen",
  deliveryTime: '20-25 min',
  tags: ['Spicy', 'Filling'],
  sizes: [
    { id: 1, name: 'Regular', price: 18 },
    { id: 2, name: 'Large', price: 25 },
  ],
  addOns: [
    { id: 1, name: 'Extra Egg', price: 3 },
    { id: 2, name: 'Extra Wele', price: 5 },
    { id: 3, name: 'Fried Fish', price: 8 },
  ],
  basePrice: 18,
  instructions: 'E.g., Extra spicy, No onions, etc.',
};

export default foodItemData;
