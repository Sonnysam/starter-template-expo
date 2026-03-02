const CHECKOUT_DATA = {
  orderId: 'ORD-2025-001',
  restaurantName: 'TechHub Ghana',

  items: [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      restaurant: 'TechHub Ghana',
      price: 3500,
      quantity: 1,
      size: '256GB',
      image: 'https://dummyimage.com/80x80/000/fff.png',
    },
  ],

  deliveryMethods: [
    {
      id: 1,
      name: 'Campus Meet-up',
      description: 'Meet at campus location',
      cost: 0,
      isSelected: true,
    },
    {
      id: 2,
      name: 'Delivery to Hostel',
      description: 'Door delivery to your hostel',
      cost: 10,
    },
  ],

  paymentMethods: [
    {
      id: 1,
      name: 'Mobile Money',
      providers: 'MTN, Vodafone, AirtelTigo',
      isSelected: true,
    },
    {
      id: 2,
      name: 'Credit/Debit Card',
      providers: 'Visa, Mastercard',
      isSelected: false,
    },
  ],

  pricing: {
    subtotal: 3500,
    deliveryFee: 0,
    platformFeePercentage: 5,
    total: 3675,
  },

  buyerProtection: {
    title: 'Buyer Protection',
    message:
      'Your payment will be held securely until you confirm receipt of the item. Seller gets paid only after confirmation.',
  },
};

export default CHECKOUT_DATA;
