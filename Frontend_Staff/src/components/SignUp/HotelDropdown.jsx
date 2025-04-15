const HotelDropdown = ({ register, hotels = [] }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
      <select
        {...register("hotel_name", { required: true })}
        className="mt-1 py-1 px-4 w-full border rounded-md"
      >
        {hotels.map(hotel => (
          <option key={hotel.id} value={hotel.name}>{hotel.name}</option>
        ))}
      </select>
    </div>
  );
  export default HotelDropdown;