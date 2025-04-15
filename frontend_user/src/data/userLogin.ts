
// User data
export const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  hasActiveBooking: true,
  hasPastBookings: true
};

// Current booking data
export const currentBooking = {
  bookingId: "BK12345",
  hotelName: "Grand Plaza Hotel",
  roomNumber: "304",
  roomType: "Deluxe King Suite",
  checkIn: "Apr 10, 2025",
  checkOut: "Apr 15, 2025",
  status: "Confirmed" as const,
  price: 299,
  guests: 2,
};

// Past bookings data
export const pastBookings = [
  {
    bookingId: "BK10982",
    hotelName: "Seaside Resort",
    roomType: "Ocean View Suite",
    checkIn: "Feb 15, 2025",
    checkOut: "Feb 18, 2025",
    status: "Completed" as const,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    bookingId: "BK10567",
    hotelName: "Mountain Lodge",
    roomType: "Cabin Suite",
    checkIn: "Jan 3, 2025",
    checkOut: "Jan 7, 2025",
    status: "Completed" as const,
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    bookingId: "BK10245",
    hotelName: "Urban Boutique",
    roomType: "Executive Suite",
    checkIn: "Dec 12, 2024",
    checkOut: "Dec 15, 2024",
    status: "Cancelled" as const,
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    bookingId: "BK10111",
    hotelName: "Palm Beach Resort",
    roomType: "Beachfront Villa",
    checkIn: "Nov 20, 2024",
    checkOut: "Nov 25, 2024",
    status: "Completed" as const,
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2649&q=80"
  },
];

// Featured rooms data
export const featuredRooms = [
  {
    id: "room1",
    name: "Deluxe King Room",
    description: "Spacious room with king-size bed and city views. Perfect for couples or solo travelers.",
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    amenities: ["Free Wi-Fi", "Minibar", "Coffee Machine", "Smart TV", "Room Service"]
  },
  {
    id: "room2",
    name: "Executive Suite",
    description: "Luxury suite with separate living area, premium amenities, and panoramic views.",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Free Wi-Fi", "Living Room", "Workspace", "Bathtub", "Premium Toiletries", "Nespresso Machine"]
  },
  {
    id: "room3",
    name: "Family Suite",
    description: "Perfect for families, featuring two bedrooms and a comfortable living space.",
    price: 279,
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    amenities: ["Free Wi-Fi", "2 Bedrooms", "Kitchenette", "Game Console", "Child-friendly"]
  },
  {
    id: "room4",
    name: "Penthouse Suite",
    description: "Our most luxurious accommodation with stunning views and premium services.",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    amenities: ["Free Wi-Fi", "Private Terrace", "Jacuzzi", "Butler Service", "Dining Area", "Bar"]
  },
];

// Special offers data
export const specialOffers = [
  {
    id: "offer1",
    title: "Weekend Getaway",
    description: "Book a weekend stay and enjoy complimentary breakfast and late checkout.",
    discount: "15%",
    validUntil: "May 31, 2025",
    backgroundColor: "bg-gradient-to-r from-hotel-primary to-blue-700"
  },
  {
    id: "offer2",
    title: "Extended Stay Deal",
    description: "Stay 7 nights or more and receive special pricing plus room upgrade when available.",
    discount: "25%",
    validUntil: "Jun 30, 2025",
    backgroundColor: "bg-gradient-to-r from-emerald-500 to-teal-700"
  },
  {
    id: "offer3",
    title: "Early Bird Special",
    description: "Book 60 days in advance and save on our best available rates.",
    discount: "20%",
    validUntil: "Dec 31, 2025",
    backgroundColor: "bg-gradient-to-r from-amber-500 to-orange-700"
  }
];

// Hotel services data
export const hotelServices = [
  {
    title: "Fine Dining",
    description: "Experience exquisite cuisine at our award-winning restaurants.",
    icon: "🍽️"
  },
  {
    title: "Spa & Wellness",
    description: "Rejuvenate with our premium spa treatments and facilities.",
    icon: "💆"
  },
  {
    title: "Fitness Center",
    description: "Stay active with our 24/7 state-of-the-art fitness facilities.",
    icon: "🏋️"
  },
  {
    title: "Business Center",
    description: "Full-service business center with meeting rooms available.",
    icon: "💼"
  }
];
