import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BookingProvider, BookingContext } from "./BookingContext";

describe("BookingContext", () => {
  it("provides initial room and booking data", async () => {
    let contextValue;

    render(
      <BookingProvider>
        <BookingContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BookingContext.Consumer>
      </BookingProvider>
    );

    expect(contextValue.rooms).toHaveLength(4);
    expect(contextValue.bookings).toHaveLength(2);
    expect(contextValue.currentBooking).toBeTruthy();
  });

  it("fetches rooms and bookings", async () => {
    let contextValue;

    render(
      <BookingProvider>
        <BookingContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BookingContext.Consumer>
      </BookingProvider>
    );

    await act(async () => {
      await contextValue.fetchRooms();
      await contextValue.fetchBookings();
    });

    expect(contextValue.rooms).toHaveLength(4);
    expect(contextValue.bookings).toHaveLength(2);
  });

  it("books a room", async () => {
    let contextValue;

    render(
      <BookingProvider>
        <BookingContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BookingContext.Consumer>
      </BookingProvider>
    );

    const bookingData = {
      roomId: 1,
      checkIn: "2025-04-20",
      checkOut: "2025-04-25",
    };

    await act(async () => {
      const result = await contextValue.bookRoom(bookingData);
      expect(result.data).toBeTruthy();
    });

    expect(contextValue.bookings).toHaveLength(3);
  });

  it("cancels a booking", async () => {
    let contextValue;

    render(
      <BookingProvider>
        <BookingContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BookingContext.Consumer>
      </BookingProvider>
    );

    await act(async () => {
      await contextValue.cancelBooking(1);
    });

    const cancelledBooking = contextValue.bookings.find(
      (booking) => booking.bookingId === 1
    );
    expect(cancelledBooking.status).toBe("cancelled");
  });
});