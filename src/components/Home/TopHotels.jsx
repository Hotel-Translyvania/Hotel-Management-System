import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HotelCard from "./HotelCard";
import api from "@/api";

const TopHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/hotels");

        // Log the full response to understand its structure
        console.log("API Response:", res.data);

        // Access the array of hotels inside the 'data' property
        const rawHotels = res.data.data; // 'data' contains the array of hotels

        // Map over the hotels array to clean and structure it
        const cleaned = rawHotels.map((hotel) => ({
          id: hotel.id,
          name: hotel.name, // Adjust the field name as needed
          description: hotel.description,
          address: hotel.address,
          city: hotel.city,
          country: hotel.country,
          pricePerNight: hotel["pricePerNight"], // Adjust this field if necessary
          isActive: hotel.isActive, // Adjust field names according to the API response
          location: hotel.location ?? `${hotel.city}, ${hotel.country}`,
          image: hotel.image,
        }));

        setHotels(cleaned); // Set the cleaned data in state
      } catch (err) {
        setError("Failed to load hotels.");
        console.error(err); // Log any errors for better debugging
      } finally {
        setLoading(false); // Stop the loading spinner or message
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