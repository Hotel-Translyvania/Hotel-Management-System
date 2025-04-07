import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import HotelCard from "./HotelCard";

const TopHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("/api/top-hotels");
        const rawHotels = res.data;

        const cleaned = rawHotels.map((hotel) => ({
          id: hotel.id,
          name: hotel.namee,
          description: hotel.description,
          address: hotel.address,
          city: hotel.city,
          country: hotel.country,
          pricePerNight: hotel["price per night"],
          isActive: hotel.isActIve,
          location: hotel.location ?? `${hotel.city}, ${hotel.country}`,
          image: hotel.image
        }));

        setHotels(cleaned);
      } catch (err) {
        setError("Failed to load hotels.");
        console.error(err);
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
                rating={hotel.rating || 4.5} // fallback to 0 if rating is not available
                price={hotel.pricePerNight}
                description={hotel.description}
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