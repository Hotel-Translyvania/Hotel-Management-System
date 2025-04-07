export const hotelName = "Hotel Management System";
export const Administration = "Administration";

export const navItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "🏠",
    path: "/dashboard",
  },
  {
    id: "guests",
    name: "Guests",
    icon: "👥",
    path: "/guests",
  },
  {
    id: "reservations",
    name: "Reservations",
    icon: "📅",
    path: "/reservations",
  },
  {
    id: "rooms",
    name: "Rooms",
    icon: "🏨",
    path: "/rooms",
  },
  {
    id: "restaurant",
    name: "Food & Beverages",
    icon: "🍔",
    path: "/restaurant",
  },
  {
    id: "staff",
    name: "Staff Members",
    icon: "👨‍💼",
    path: "/staff",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    path: "/setting",
  },
];

export const userProfile = {
  firstName: "Christopher",
  lastName: "Thomas",
  email: "christopher.thomas@example.com",
  phone: "+1 888 999 0001",
  dob: "1986-06-19",
  address: "234 Elm St, CO",
  salary: "6.0k",
  role: "Security",
  employedDate: "2018-08-09",
  status: "active",
  picture: "https://randomuser.me/api/portraits/men/9.jpg",
};

export const AdminProfile = {
  firstName: "John",
  lastName: "Wick",
  email: "john.wick@example.com",
  phone: "+1 888 999 0001",
  dob: "1986-06-19",
  role: "Admin",
  picture: "https://randomuser.me/api/portraits/men/9.jpg",
};

export const AdminNavItems = [
  {
    id: "hotels",
    name: "Hotels",
    icon: "🏨",
    path: "/admin/hotels",
  },
  {
    id: "managers",
    name: "Managers",
    icon: "👥",
    path: "/admin/managers",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    path: "/admin/settings",
  },
];
