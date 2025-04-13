function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
import Navbar from '@/components/Navbar/Navbar';
import HotelListingPage from '@/components/browse_hotels/HotelListingPage';

const BrowseHotels = () => {
  return <HotelListingPage />;
};

export default BrowseHotels;
