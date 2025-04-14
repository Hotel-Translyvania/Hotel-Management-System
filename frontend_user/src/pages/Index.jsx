
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TopHotels from "@/components/Home/TopHotels";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();

  const handleHotelClick = (hotelName, hotelId) => {
    navigate(`/rooms/${hotelName}/${hotelId}`); // dynamic route with id
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TopHotels onHotelClick={handleHotelClick} />
      <Testimonials />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
