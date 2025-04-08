import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import ServiceHistory from './components/Service/ServiceHistory';
import RoomsPage from "./pages/RoomsPage";
import BookingPage from "./pages/BookingPage";
import BookingDetails from "./components/Rooms/BookingDetails";
import { BookingProvider } from "./data/BookingContext";
import UserLogin from "./pages/userLogin";
import BrowseHotels from "./pages/BrowseHotels";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import TestPaymentModal from "./pages/TestPaymentModals";
import "./App.css";

import Menu from './pages/restaurant/Menu';
import OrderHistory from './pages/restaurant/OrderHistory';
import OrderForm from './pages/restaurant/OrderForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} /> {/* Remove */}
            <Route path="/history" element={<ServiceHistory />} /> {/* Remove */}
            <Route path="/menu" element={<Menu />} /> {/* Remove */}
            <Route path="/billing" element={<Billing />} />
            <Route path="/restaurant/menu" element={<Menu />} />
            <Route path="/restaurant/history" element={<OrderHistory />} />
            <Route path="/restaurant/order" element={<OrderForm />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/history" element={<ServiceHistory />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/user_login" element={<UserLogin />} />
            <Route path="/browse_hotels" element={<BrowseHotels />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment_modal" element={<TestPaymentModal />} />
            {/* These routes would be implemented later as the application grows */}
            <Route path="/user_rooms" element={<NotFound />} />
            <Route path="/user_rooms/:id" element={<NotFound />} />
            <Route path="/user_bookings" element={<NotFound />} />
            <Route path="/user_bookings/:id" element={<NotFound />} />
            <Route path="/user_services" element={<NotFound />} />
            <Route path="/offers" element={<NotFound />} />
            <Route path="/offers/:id" element={<NotFound />} />
            <Route path="/profile" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/destinations" element={<NotFound />} />
            <Route path="/support" element={<NotFound />} />
            <Route path="/rewards" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BookingProvider>
          <Routes>
          {/* Restaurant routes */}
          <Route path="/restaurant/menu" element={<Menu />} />
          <Route path="/restaurant/history" element={<OrderHistory />} />
          <Route path="/restaurant/order" element={<OrderForm />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;