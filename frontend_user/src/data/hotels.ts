
export interface Hotel {
  id: number;
  name: string;
  rating: number;
  location: string;
  price: number;
  description: string;
  image: string;
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    rating: 4.7,
    location: "New York, NY",
    price: 250,
    description: "Experience luxury in the heart of the city with stunning views and world-class service. Our rooms offer ultimate comfort for business and leisure travelers.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Wi-Fi", "Pool", "Spa", "Gym"]
  },
  {
    id: 2,
    name: "Harbor View Resort",
    rating: 4.3,
    location: "San Francisco, CA",
    price: 320,
    description: "Oceanfront resort with private beach access and panoramic bay views. Enjoy spacious suites with balconies overlooking the Pacific.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Beach Access", "Restaurant", "Bar", "Free Parking"]
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    rating: 4.8,
    location: "Aspen, CO",
    price: 480,
    description: "Cozy mountain lodge surrounded by pine forests. Perfect for outdoor enthusiasts with ski-in/ski-out access and roaring fireplaces.",
    image: "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Fireplace", "Ski Access", "Hot Tub", "Restaurant"]
  },
  {
    id: 4,
    name: "Sunset Bay Resort",
    rating: 4.2,
    location: "Miami, FL",
    price: 210,
    description: "Contemporary beachfront hotel featuring sleek design and Miami's vibrant culture. Relax by our infinity pool with handcrafted cocktails.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Beach", "Pool", "Nightclub", "Restaurant"]
  },
  {
    id: 5,
    name: "The Metropolitan",
    rating: 4.5,
    location: "Chicago, IL",
    price: 290,
    description: "Urban luxury in downtown Chicago with award-winning dining and elegant rooms. Walking distance to major attractions and business centers.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Business Center", "Gym", "Spa", "Fine Dining"]
  },
  {
    id: 6,
    name: "Desert Oasis Resort",
    rating: 4.6,
    location: "Phoenix, AZ",
    price: 325,
    description: "Luxurious desert retreat with adobe-inspired architecture. Enjoy multiple pools, cactus gardens, and spectacular sunset views.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Pool", "Golf", "Spa", "Desert Tours"]
  },
  {
    id: 7,
    name: "Historic Central Hotel",
    rating: 3.9,
    location: "Boston, MA",
    price: 190,
    description: "Charming boutique hotel in a restored 19th-century building. Experience Boston's history with modern comforts and personalized service.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Breakfast", "Bar", "Walking Tours", "Bike Rental"]
  },
  {
    id: 8,
    name: "Lakeside Retreat",
    rating: 4.4,
    location: "Seattle, WA",
    price: 275,
    description: "Serene lakefront property with breathtaking mountain views. Enjoy water activities, hiking trails, and cozy accommodations.",
    image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Lake Access", "Kayaking", "Nature Trails", "Restaurant"]
  },
  {
    id: 9,
    name: "Urban Boutique Hotel",
    rating: 4.1,
    location: "Portland, OR",
    price: 180,
    description: "Eco-friendly boutique hotel with locally sourced materials and artisanal furnishings. Experience Portland's vibrant culture.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Bicycle Rental", "Organic Breakfast", "Local Art", "Rooftop Bar"]
  },
  {
    id: 10,
    name: "Royal Garden Hotel",
    rating: 4.9,
    location: "New Orleans, LA",
    price: 340,
    description: "Elegant hotel with French Quarter charm and lush courtyard gardens. Experience luxury with a touch of Southern hospitality.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Courtyard", "Jazz Bar", "Fine Dining", "Concierge"]
  },
  {
    id: 11,
    name: "City View Suites",
    rating: 4.0,
    location: "Denver, CO",
    price: 230,
    description: "Modern all-suite hotel with breathtaking city and mountain views. Spacious accommodations perfect for extended stays.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Kitchen", "Workspace", "Laundry", "Gym"]
  },
  {
    id: 12,
    name: "Seaside Inn",
    rating: 3.8,
    location: "Monterey, CA",
    price: 195,
    description: "Charming coastal inn just steps from the beach. Enjoy fresh sea air, stunning sunsets, and comfortable accommodations.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    amenities: ["Ocean View", "Breakfast", "Beach Chairs", "Parking"]
  }
];
