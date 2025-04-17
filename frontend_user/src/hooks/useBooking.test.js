import { renderHook } from "@testing-library/react";
import { BookingProvider } from "../data/BookingContext";
import { useBooking } from "./useBooking";

describe("useBooking", () => {
  it("throws an error when used outside of BookingProvider", () => {
    expect(() => renderHook(() => useBooking())).toThrow(
      "useBooking must be used within a BookingProvider"
    );
  });

  it("provides context when used within BookingProvider", () => {
    const { result } = renderHook(() => useBooking(), {
      wrapper: BookingProvider,
    });

    expect(result.current.rooms).toBeDefined();
    expect(result.current.bookings).toBeDefined();
  });
});