import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoomSelection from "./RoomSelection";

// Mock dependencies from CustomTable
jest.mock("../Auth/authStore", () => ({
  useAuthStore: jest.fn(() => ({
    user: { role: "staff" },
  })),
}));

jest.mock("@/components/ui/table", () => ({
  Table: ({ children, ...props }) => <table {...props}>{children}</table>,
  TableBody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  TableCell: ({ children, ...props }) => <td {...props}>{children}</td>,
  TableHead: ({ children, ...props }) => <th {...props}>{children}</th>,
  TableHeader: ({ children, ...props }) => <thead {...props}>{children}</thead>,
  TableRow: ({ children, ...props }) => <tr {...props}>{children}</tr>,
}));

jest.mock("./TableToolbar", () => ({
  TableToolbar: ({ onAddClick, addButtonText, role }) => (
    <div>
      {addButtonText && <button onClick={onAddClick}>{addButtonText}</button>}
    </div>
  ),
}));

jest.mock("./TablePagination", () => ({
  TablePagination: () => <div>Table Pagination</div>,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowUpDown: () => <svg data-testid="arrow-up-down-icon" />,
}));

// Mock dependencies for cn
jest.mock("clsx", () => ({
  clsx: (...args) => args.filter(Boolean).join(" "),
}));
jest.mock("tailwind-merge", () => ({
  twMerge: (className) => className,
}));

describe("RoomSelection Component", () => {
  const mockSetSelectedRoom = jest.fn();
  const mockHandleRoomSelection = jest.fn();
  const defaultRooms = [
    {
      roomNumber: "101",
      roomType: "Standard",
      bedType: "Single",
      size: 300,
      maxOccupancy: 2,
      price: 100,
      amenities: ["Wi-Fi", "TV"],
    },
    {
      roomNumber: "102",
      roomType: "Deluxe",
      bedType: "Queen",
      size: 400,
      maxOccupancy: 3,
      price: 150,
      amenities: ["Wi-Fi", "TV", "Mini Bar"],
    },
  ];

  beforeEach(() => {
    mockSetSelectedRoom.mockClear();
    mockHandleRoomSelection.mockClear();
  });

  it("renders the table and allows room selection with save (happy path)", async () => {
    render(
      <RoomSelection
        setSelectedRoom={mockSetSelectedRoom}
        handleRoomSelection={mockHandleRoomSelection}
        selectedRoom={null}
        room={defaultRooms}
      />
    );

    expect(screen.getByText("Room")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Single || 300 sqft")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("100$")).toBeInTheDocument();

    expect(screen.getByText("102")).toBeInTheDocument();
    expect(screen.getByText("Deluxe")).toBeInTheDocument();
    expect(screen.getByText("Queen || 400 sqft")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("150$")).toBeInTheDocument();

    const radioButtons = screen.getAllByRole("radio");
    fireEvent.click(radioButtons[0]); // Select room 101

    expect(mockSetSelectedRoom).toHaveBeenCalledWith(defaultRooms[0]);

    const saveButton = screen.getByRole("button", { name: /Save/i });
    expect(saveButton).toHaveClass("bg-blue-600 hover:bg-blue-700");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockHandleRoomSelection).toHaveBeenCalled();
    });
  });

  it("renders with no rooms (edge case)", () => {
    render(
      <RoomSelection
        setSelectedRoom={mockSetSelectedRoom}
        handleRoomSelection={mockHandleRoomSelection}
        selectedRoom={null}
        room={[]}
      />
    );

    expect(screen.getByText("No records found")).toBeInTheDocument();
    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockHandleRoomSelection).not.toHaveBeenCalled();
  });

  it("handles large number of rooms (edge case)", () => {
    const manyRooms = Array.from({ length: 100 }, (_, i) => ({
      roomNumber: `${101 + i}`,
      roomType: "Standard",
      bedType: "Single",
      size: 300,
      maxOccupancy: 2,
      price: 100,
      amenities: ["Wi-Fi", "TV"],
    }));

    render(
      <RoomSelection
        setSelectedRoom={mockSetSelectedRoom}
        handleRoomSelection={mockHandleRoomSelection}
        selectedRoom={null}
        room={manyRooms}
      />
    );

    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getAllByText("Standard").length).toBe(100);
  });

  it("does not call handleRoomSelection if no room is selected (error condition)", () => {
    render(
      <RoomSelection
        setSelectedRoom={mockSetSelectedRoom}
        handleRoomSelection={mockHandleRoomSelection}
        selectedRoom={null}
        room={defaultRooms}
      />
    );

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockHandleRoomSelection).not.toHaveBeenCalled();
  });

  it("handles failure in handleRoomSelection (error condition)", async () => {
    mockHandleRoomSelection.mockRejectedValue(new Error("Selection error"));

    render(
      <RoomSelection
        setSelectedRoom={mockSetSelectedRoom}
        handleRoomSelection={mockHandleRoomSelection}
        selectedRoom={null}
        room={defaultRooms}
      />
    );

    const radioButtons = screen.getAllByRole("radio");
    fireEvent.click(radioButtons[0]);

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockHandleRoomSelection).toHaveBeenCalled();
    });
  });
});