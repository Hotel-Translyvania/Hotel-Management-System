
// Mock data for the hotel billing page
export type BillingStatus = "paid" | "pending" | "partial";
export type ServiceType = "room" | "restaurant" | "spa" | "event" | "other";
export type PaymentMethod = "cash" | "card" | "paypal";

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  reservationId?: string;
}

export interface ServiceDetails {
  type: ServiceType;
  description: string;
  // Room-specific details
  roomNumber?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  // Restaurant-specific details
  tableNumber?: string;
  orderItems?: { name: string; price: number; quantity: number }[];
  date?: string;
  time?: string;
  // Spa-specific details
  treatment?: string;
  therapist?: string;
  duration?: number;
  // Event-specific details
  eventName?: string;
  location?: string;
  attendees?: number;
}

export interface ChargeItem {
  id: string;
  description: string;
  category: ServiceType;
  date: string;
  amount: number;
  tax: number;
}

export interface BillingHistory {
  id: string;
  date: string;
  total: number;
  status: BillingStatus;
  items: ChargeItem[];
}

export interface BillingSummary {
  subtotal: number;
  tax: number;
  serviceCharge?: number;
  discount?: number;
  total: number;
  status: BillingStatus;
  paymentMethod?: PaymentMethod;
}

export interface BillingData {
  id: string;
  guest: GuestInfo;
  service: ServiceDetails;
  charges: ChargeItem[];
  summary: BillingSummary;
  history: BillingHistory[];
}

// Mock data
export const mockBillingData: BillingData = {
  id: "INV-2023-1234",
  guest: {
    name: "Alexander Hamilton",
    email: "alexander@example.com",
    phone: "+1 (555) 123-4567",
    address: "1234 Luxury Ave, New York, NY 10001",
    reservationId: "RES-78901"
  },
  service: {
    type: "room",
    description: "Deluxe Suite Stay",
    roomNumber: "501",
    roomType: "Deluxe Ocean View Suite",
    checkIn: "2023-10-15T14:00:00",
    checkOut: "2023-10-18T12:00:00",
    nights: 3
  },
  charges: [
    {
      id: "CHG-001",
      description: "Deluxe Ocean View Suite - Night 1",
      category: "room",
      date: "2023-10-15",
      amount: 350,
      tax: 35
    },
    {
      id: "CHG-002",
      description: "Deluxe Ocean View Suite - Night 2",
      category: "room",
      date: "2023-10-16",
      amount: 350,
      tax: 35
    },
    {
      id: "CHG-003",
      description: "Deluxe Ocean View Suite - Night 3",
      category: "room",
      date: "2023-10-17",
      amount: 350,
      tax: 35
    },
    {
      id: "CHG-004",
      description: "Breakfast Buffet - 2 persons",
      category: "restaurant",
      date: "2023-10-16",
      amount: 60,
      tax: 6
    },
    {
      id: "CHG-005",
      description: "Fine Dining Dinner - The Ritz Restaurant",
      category: "restaurant",
      date: "2023-10-16",
      amount: 180,
      tax: 18
    },
    {
      id: "CHG-006",
      description: "Aromatherapy Massage - 90 min",
      category: "spa",
      date: "2023-10-17",
      amount: 150,
      tax: 15
    },
    {
      id: "CHG-007",
      description: "Mini Bar Consumption",
      category: "other",
      date: "2023-10-17",
      amount: 45,
      tax: 4.5
    }
  ],
  summary: {
    subtotal: 1485,
    tax: 148.5,
    serviceCharge: 74.25,
    discount: 100,
    total: 1607.75,
    status: "pending",
    paymentMethod: undefined
  },
  history: [
    {
      id: "INV-2023-9876",
      date: "2023-05-20",
      total: 1250.75,
      status: "paid",
      items: [
        {
          id: "HIST-001",
          description: "Deluxe King Room - 2 nights",
          category: "room",
          date: "2023-05-18",
          amount: 600,
          tax: 60
        },
        {
          id: "HIST-002",
          description: "Restaurant Charges",
          category: "restaurant",
          date: "2023-05-19",
          amount: 145,
          tax: 14.5
        }
      ]
    },
    {
      id: "INV-2023-8765",
      date: "2023-02-15",
      total: 2350.50,
      status: "paid",
      items: [
        {
          id: "HIST-003",
          description: "Presidential Suite - 3 nights",
          category: "room",
          date: "2023-02-12",
          amount: 1800,
          tax: 180
        },
        {
          id: "HIST-004",
          description: "Spa & Wellness",
          category: "spa",
          date: "2023-02-13",
          amount: 250,
          tax: 25
        }
      ]
    }
  ]
};

// Function to dynamically update service details based on type
export const updateServiceDetails = (serviceType: ServiceType): ServiceDetails => {
  switch(serviceType) {
    case "room":
      return {
        type: "room",
        description: "Deluxe Suite Stay",
        roomNumber: "501",
        roomType: "Deluxe Ocean View Suite",
        checkIn: "2023-10-15T14:00:00",
        checkOut: "2023-10-18T12:00:00",
        nights: 3
      };
    
    case "restaurant":
      return {
        type: "restaurant",
        description: "Fine Dining Experience",
        tableNumber: "12",
        orderItems: [
          { name: "Filet Mignon", price: 65, quantity: 2 },
          { name: "Lobster Thermidor", price: 85, quantity: 1 },
          { name: "Château Margaux 2015", price: 320, quantity: 1 }
        ],
        date: "2023-10-16",
        time: "19:30"
      };
    
    case "spa":
      return {
        type: "spa",
        description: "Premium Spa Treatment",
        treatment: "Aromatherapy Massage & Hot Stone Therapy",
        therapist: "Emma Watson",
        duration: 120,
        date: "2023-10-17",
        time: "14:00"
      };
    
    case "event":
      return {
        type: "event",
        description: "Private Dining Event",
        eventName: "Anniversary Dinner",
        location: "The Crystal Ballroom",
        attendees: 8,
        date: "2023-10-17",
        time: "20:00"
      };
    
    default:
      return {
        type: "other",
        description: "Additional Services"
      };
  }
};

// Generate filtered charges for a specific category
export const getCategoryCharges = (category: ServiceType): ChargeItem[] => {
  return mockBillingData.charges.filter(charge => charge.category === category);
};