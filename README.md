# 🏨 Hotel Transylvania Management System

## Overview

The **Hotel Transylvania Management System** is a comprehensive hotel management solution designed to streamline operations for hotel staff and provide a seamless experience for guests. The system consists of multiple components including backend services, staff frontend, and user frontend interfaces.

---

## ✨ Features

### For Hotel Staff
- **Dashboard**: View analytics and key metrics  
- **Guest Management**: Track and manage guest information  
- **Room Management**: Monitor room inventory and status  
- **Reservation Management**: Handle bookings and check-ins/check-outs  
- **Staff Management**: Assign tasks and manage staff profiles  
- **Restaurant Menu Management**: Manage food orders and menu items  

### For Hotel Guests
- **Hotel Browsing**: Search and view available hotels  
- **Room Booking**: Make reservations online  
- **Profile Management**: Manage personal information  
- **Food Ordering**: Order food from the hotel restaurant  

---

## 🏗️ Architecture

The system follows a three-tier architecture:

- **Data Layer**
- **Server Layer**
- **Client Layer**

### API Modules

| Module | Type |
|--------|------|
| AuthModule | CRUD |
| HotelsModule | CRUD |
| BookingsModule | CRUD |
| HMSModule | CRUD |
| FoodMenuModule | CRUD |
| PaymentModule | Processing |

### Services

- **Image Storage**: Cloudinary  
- **Notifications & Confirmations**: Email Service  
- **Payment Gateway**: Stripe  

---

## 💻 Technology Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: TypeORM with PostgreSQL
- **Authentication**: JWT-based
- **API**: RESTful (versioned - `v1`)

### Frontend
- **Framework**: React
- **UI Components**: Custom + UI libraries
- **State Management**: Custom stores, Context API
- **Styling**: Tailwind CSS

### External Services
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary
- **Email Service**: Custom SMTP

---

## 📁 Project Structure

Hotel-Management-System/
├── backend/ # NestJS backend API
│ ├── src/
│ │ ├── common/ # Shared utilities
│ │ ├── v1/ # Version 1 APIs
│ │ │ ├── auth/
│ │ │ ├── hms/
│ │ │ ├── payment/
│ │ │ └── ...
│ │ └── main.ts
├── frontend_user/ # Guest-facing React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
└── Frontend_Staff/ # Staff-facing React frontend
├── src/
│ ├── components/
│ ├── pages/
│ └── App.jsx


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Hotel-Translyvania/Hotel-Management-System.git
cd Hotel-Management-System
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend_user
npm install

cd ../Frontend_Staff
npm install
```

4. **Set up environment variables**
Create .env files in each directory based on the provided examples.

5. **Run development servers**

```bash
# Backend
cd backend
npm run start:dev

# User Frontend
cd ../frontend_user
npm run dev

# Staff Frontend
cd ../Frontend_Staff
npm run dev
```

## 📘 API Documentation

All routes are prefixed with `/api/v1`.

| Route                             | Purpose                         |
|----------------------------------|---------------------------------|
| `/api/v1/auth/*`                 | Authentication and authorization |
| `/api/v1/hotels/*`               | Hotel property management        |
| `/api/v1/hotels/:id/rooms/*`     | Room management                  |
| `/api/v1/bookings/*`             | Reservation management           |
| `/api/v1/hms/dashboard/*`        | Analytics and reporting          |
| `/api/v1/hms/staff/*`            | Staff management                 |
| `/api/v1/hms/guest/*`            | Guest profile management         |
| `/api/v1/food-menu/*`            | Restaurant menu and orders       |
| `/api/v1/payments/*`             | Payment processing               |

---

## 🤝 Contributing

1. **Fork** the repository  
2. **Create** your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
    ```

3. **Commit** your changes:
  ```bash
  git commit -m 'Add some amazing feature'
  ```
4. **Push** to the branch:
  ```bash
  git push origin feature/amazing-feature
  ```
5. **Open** a pull request

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- **Hotel Transylvania Management System Team**
- **Contributors and Maintainers**


