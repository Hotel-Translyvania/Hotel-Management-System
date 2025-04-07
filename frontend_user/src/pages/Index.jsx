
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TopHotels from "@/components/home/TopHotels";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";


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
