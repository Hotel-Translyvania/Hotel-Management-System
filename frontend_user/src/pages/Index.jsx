
import Navbar from "@/components/Home/Navbar";
import Hero from "@/components/Home/Hero";
import TopHotels from "@/components/Home/TopHotels";
import Testimonials from "@/components/Home/Testimonials";
import Features from "../components/Home/Features";
import Footer from "@/components/Home/Footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TopHotels />
      <Testimonials />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
