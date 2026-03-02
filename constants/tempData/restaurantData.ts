const restaurantInfo = {
  id: 1,
  name: "Mama's Kitchen",
  description:
    'Authentic local dishes prepared with love. Popular for our waakye and banku with tilapia.',
  rating: 4.8,
  reviews: 342,
  deliveryTime: '25-35 min',
  deliveryFee: 8,
  minOrder: 15,
  isOpen: true,
  image: 'https://dummyimage.com/443x224/000/fff.png',
  location: 'KNUST Main Gate',
  hours: '8:00 AM - 10:00 PM',
  specialties: ['Waakye', 'Banku & Tilapia', 'Jollof Rice', 'Red Red'],
  badges: [
    {
      text: 'Fast Delivery',
      color: 'rgba(239, 246, 255, 1)',
      textColor: 'rgba(21, 93, 252, 1)',
    },
    {
      text: 'Popular',
      color: 'rgba(239, 246, 255, 1)',
      textColor: 'rgba(21, 93, 252, 1)',
    },
    {
      text: 'Student Favorite',
      color: 'rgba(239, 246, 255, 1)',
      textColor: 'rgba(21, 93, 252, 1)',
    },
    {
      text: '🌙 Night Shop Available',
      color: 'rgba(250, 245, 255, 1)',
      textColor: 'rgba(152, 16, 250, 1)',
    },
  ],
};

export const menuCategories = [
  { id: 1, emoji: '🔥', label: 'Popular', isDefault: true },
  { id: 2, emoji: '🍽️', label: 'Main Course', isDefault: false },
  { id: 3, emoji: '🥗', label: 'Sides', isDefault: false },
  { id: 4, emoji: '🥤', label: 'Drinks', isDefault: false },
  { id: 5, emoji: '🍰', label: 'Desserts', isDefault: false },
];

export const menuItems = [
  {
    id: 1,
    name: 'Waakye Special',
    description: 'Rice and beans with spaghetti, gari, egg, wele, and shito',
    price: 18,
    rating: '🔥 Popular',
    tags: ['Spicy', 'Filling'],
    deliveryTime: '20-25 min',
    image: 'https://dummyimage.com/96x96/000/fff.png',
    category: 'Popular',
  },
  {
    id: 2,
    name: 'Banku & Tilapia',
    description: 'Fresh tilapia with pepper sauce and banku',
    price: 35,
    rating: '🔥 Popular',
    tags: ['Fresh', 'Spicy'],
    deliveryTime: '25-30 min',
    image: 'https://dummyimage.com/96x96/000/fff.png',
    category: 'Popular',
  },
  {
    id: 3,
    name: 'Jollof Rice',
    description: 'Tasty jollof rice with chicken',
    price: 22,
    rating: '🔥 Popular',
    tags: ['Popular', 'Party Rice'],
    deliveryTime: '15-20 min',
    image: 'https://dummyimage.com/96x96/000/fff.png',
    category: 'Popular',
  },
];

export default restaurantInfo;
