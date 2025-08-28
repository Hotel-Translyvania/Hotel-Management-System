import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoomList from "./RoomList";
import { useRoomStore } from "@/components/store/useRoomStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
  Edit: () => <svg data-testid="edit-icon" />,
  ArrowUpDown: () => <svg data-testid="arrow-up-down-icon" />,
  Trash2: () => <svg data-testid="trash-icon" />,
  XIcon: () => <svg data-testid="x-icon" />,
}));

// Mock dependencies for cn
jest.mock("clsx", () => ({
  clsx: (...args) => args.filter(Boolean).join(" "),
}));
jest.mock("tailwind-merge", () => ({
  twMerge: (className) => className,
}));

describe("RoomList Component", () => {
  const mockAxios = new MockAdapter(axios);
  const rooms = [
    {
      id: "1",
      roomNumber: "101",
      type: "Standard",
      bedType: "Single",
      status: "available",
      price: 100,
      description: "A cozy room",
      size: 300,
      occupancy: 2,
      amenities: ["Wi-Fi", "TV"],
      image: "http://example.com/room.jpg",
    },
  ];

  beforeEach(() => {
    mockAxios.reset();
    useRoomStore.setState({
      rooms: [],
      isLoading: false,
      error: null,
      initialized: false,
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("fetches and renders the room list (happy path)", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(200, { rooms: { data: rooms } });

    render(<RoomList />);

    await waitFor(() => {
      expect(screen.getByText("Room No.")).toBeInTheDocument();
      expect(screen.getByText("101")).toBeInTheDocument();
      expect(screen.getByText("Standard")).toBeInTheDocument();
      expect(screen.getByText("Single")).toBeInTheDocument();
      expect(screen.getByText("available")).toBeInTheDocument();
      expect(screen.getByText("100$")).toBeInTheDocument();
      const addButton = screen.getByRole("button", { name: /Add Room/i });
      expect(addButton).toHaveClass("bg-blue-600 hover:bg-blue-700");
    });
  });

  it("deletes a room successfully (happy path)", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(200, { rooms: { data: rooms } });
    mockAxios
      .onDelete("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(200, {});

    render(<RoomList />);

    await waitFor(() => {
      expect(screen.getByText("101")).toBeInTheDocument();
    });

    const deleteIcon = screen.getAllByTestId("trash-icon")[0];
    const deleteButton = deleteIcon.parentElement;
    expect(deleteButton).toHaveClass("text-red-600 hover:text-red-800");
    fireEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(confirmDeleteButton).toHaveClass("bg-red-600 hover:bg-red-700");
    fireEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(useRoomStore.getState().rooms).toHaveLength(0);
      expect(screen.queryByText("Confirm Deletion")).not.toBeInTheDocument();
    });
  });

  it("renders with no rooms (edge case)", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(200, { rooms: { data: [] } });

    render(<RoomList />);

    await waitFor(() => {
      expect(screen.getByText("No records found")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Add Room/i })).toBeInTheDocument();
    });
  });

  it("handles large number of rooms (edge case)", async () => {
    const manyRooms = Array.from({ length: 100 }, (_, i) => ({
      id: `${i + 1}`,
      roomNumber: `${101 + i}`,
      type: "Standard",
      bedType: "Single",
      status: "available",
      price: 100,
      description: `Room ${101 + i}`,
      size: 300,
      occupancy: 2,
      amenities: ["Wi-Fi", "TV"],
      image: `http://example.com/room${i + 1}.jpg`,
    }));

    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(200, { rooms: { data: manyRooms } });

    render(<RoomList />);

    await waitFor(() => {
      expect(screen.getByText("101")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
      expect(screen.getAllByText("Standard").length).toBe(100);
    });
  });

  it("displays error on fetch failure (error condition)", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(500, { message: "Server error" });

    render(<RoomList />);

    await waitFor(() => {
      expect(useRoomStore.getState().error).toBe("Failed to load rooms");
      expect(screen.getByText("No records found")).toBeInTheDocument();
    });
  });

  it("displays error on deletion failure (error condition)", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(200, { rooms: { data: rooms } });
    mockAxios
      .onDelete("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(500, { message: "Server error" });

    render(<RoomList />);

    await waitFor(() => {
      expect(screen.getByText("101")).toBeInTheDocument();
    });

    const deleteIcon = screen.getAllByTestId("trash-icon")[0];
    fireEvent.click(deleteIcon.parentElement);

    const confirmDeleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(screen.getByText("Failed to delete item")).toBeInTheDocument();
      expect(useRoomStore.getState().rooms).toHaveLength(1);
    });
  });

  it("displays loading spinner during fetch", async () => {
    mockAxios
      .onGet("http://localhost:3000/api/v1/hotels/1/rooms")
      .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, { rooms: { data: rooms } }]), 1000)));

    render(<RoomList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-spin");

    await waitFor(() => {
      expect(screen.getByText("101")).toBeInTheDocument();
    });
  });
});