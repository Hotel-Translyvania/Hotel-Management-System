import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HotelCard from "./HotelCard";
import { getHotels } from "@/api"; // cleanly importing the API function

const TopHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");
        
        const hotelsData = await getHotels();
        console.log("Processed hotels data:", hotelsData);
  
        if (!Array.isArray(hotelsData)) {
          throw new Error("Expected array of hotels but got different format");
        }
  
        const cleaned = hotelsData.map((hotel) => ({
          id: hotel.id || "",
          name: hotel.name || "Unnamed Hotel",
          description: hotel.description || "No description available",
          address: hotel.address || "",
          city: hotel.city || "",
          country: hotel.country || "",
          pricePerNight: hotel.pricePerNight || 0,
          isActive: hotel.isActive !== false,
          location: hotel.location || [hotel.city, hotel.country].filter(Boolean).join(", "),
          image: hotel.image || "/default-hotel.jpg",
          rating: typeof hotel.rating === "number" ? hotel.rating : 4.5,
        }));
  
        setHotels(cleaned);
      } catch (err) {
        console.error("Full error:", err);
        setError(err.message || "Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchHotels();
  }, []);

  return (
    <section id="hotels" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top-Rated Hotels</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved properties with exceptional ratings and reviews from guests around the world.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading hotels...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                image={hotel.image}
                name={hotel.name}
                location={hotel.location}
                rating={hotel.rating}
                //price={hotel.pricePerNight}
                //description={hotel.description}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <Button className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90">
            View All Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopHotels;