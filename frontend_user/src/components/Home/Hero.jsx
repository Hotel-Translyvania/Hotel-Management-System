
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToHotels = () => {
    document.getElementById('hotels')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-shadow max-w-4xl">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-shadow animate-fade-in-delayed">
          Welcome to the best hotel booking experience. No hidden fees, best price guaranteed.
        </p>
        <div className="animate-fade-in-delayed">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-lg"
          >
            Start Booking
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown size={36} onClick={scrollToHotels} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Hero;