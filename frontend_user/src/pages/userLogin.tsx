
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WelcomeMessage from "../components/dashboard/WelcomeMessage";
import CurrentBookingCard from "../components/dashboard/CurrentBookingCard";
import PastBookingCard from "../components/dashboard/PastBookingCard";
import RoomCard from "../components/dashboard/RoomCard";
import ServiceCard from "../components/dashboard/ServiceCard";
import SpecialOffers from "../components/dashboard/SpecialOffers";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  userData, 
  currentBooking, 
  pastBookings, 
  featuredRooms, 
  specialOffers, 
  hotelServices 
} from "../data/userLogin";
import { useToast } from "@/hooks/use-toast";

const UserLogin = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { firstName, hasActiveBooking, hasPastBookings } = userData;

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Welcome toast notification
      toast({
        title: "Welcome back!",
        description: "It's great to see you again. Explore our latest offers.",
        duration: 5000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-hotel-primary border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        {/* Welcome Section */}
        <section className="mb-10">
          <WelcomeMessage 
            firstName={firstName} 
            hasActiveBooking={hasActiveBooking} 
          />
        </section>

        {/* Search Section */}
        <section className="mb-10 p-6 bg-white rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Looking for something specific?</h2>
              <p className="text-gray-600">Search for rooms, amenities, or services</p>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-hotel-primary text-white hover:bg-hotel-primary-hover">
                <Search className="mr-2 h-4 w-4" /> Search Rooms
              </Button>
            </div>
          </div>
        </section>

        {/* Current Booking Section */}
        {hasActiveBooking && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Your Current Booking</h2>
            <CurrentBookingCard {...currentBooking} />
          </section>
        )}

        {/* Room Exploration Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Featured Rooms</h2>
            <Button 
              variant="link" 
              className="text-hotel-primary font-medium"
              asChild
            >
              <a href="/rooms">Browse All Rooms</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredRooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="mb-10">
          <SpecialOffers offers={specialOffers} />
        </section>

        {/* Past Bookings Section */}
        {hasPastBookings && (
          <section className="mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Past Bookings</h2>
              <Button 
                variant="link" 
                className="text-hotel-primary font-medium"
                asChild
              >
                <a href="/bookings">View All Bookings</a>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {pastBookings.map((booking, index) => (
                <PastBookingCard key={index} {...booking} />
              ))}
            </div>
          </section>
        )}

        {/* Hotel Services Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Hotel Services</h2>
            <Button 
              variant="link" 
              className="text-hotel-primary font-medium"
              asChild
            >
              <a href="/services">View All Services</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {hotelServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={<span className="text-2xl">{service.icon}</span>}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-10 bg-gradient-to-r from-hotel-primary to-blue-700 rounded-xl overflow-hidden">
          <div className="p-8 md:p-10 text-white">
            <div className="md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for your next adventure?</h2>
              <p className="mb-6 text-white/90">
                Join our rewards program and earn points with every stay. 
                Enjoy exclusive perks and discounts at all of our locations.
              </p>
              <Button 
                className="bg-white text-hotel-primary hover:bg-gray-100"
                asChild
              >
                <a href="/rewards">Join Rewards Program</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserLogin;
