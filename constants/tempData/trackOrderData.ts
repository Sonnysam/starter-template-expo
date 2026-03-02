const trackOrderData = {
  orderId: 'ORD-2025-001',
  status: 'on_the_way',
  steps: [
    { id: 1, title: 'Order Placed', time: '10:30 AM', completed: true },
    { id: 2, title: 'Preparing', time: '10:35 AM', completed: true },
    { id: 3, title: 'On the Way', time: '10:55 AM', completed: true },
    { id: 4, title: 'Delivered', time: '', completed: false },
  ],
  estimatedDelivery: '11:10 AM',
  driver: {
    name: 'Kofi Mensah',
    phone: '+233 24 xxx xxxx',
    rating: 4.8,
  },
};

export default trackOrderData;
