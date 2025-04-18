import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CustomTable } from "@/components/Table/Table";
import { guestColumns } from "@/components/Guests/GuestsColumns";

describe("CustomTable Component", () => {
  const mockData = [
    {
      id: "G002",
      firstName: "John",
      lastName: "Doe",
      email: "jane.smith@example.com",
      phone: "+1 987 654 321",
      gender: "Female",
      address: "456 Elm St, CA",
      nationality: "Canadian",
      idType: "National ID",
      idNumber: "B98765432",
    },
    {
      id: "G003",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 555 678 123",
      gender: "Male",
      address: "789 Oak St, TX",
      nationality: "British",
      idType: "Driver License",
      idNumber: "C56789012",
    },
    {
      id: "G004",
      firstName: "Alice",
      lastName: "Alexander",
      email: "alice.alex@example.com",
      phone: "+1 890 678 123",
      gender: "Male",
      address: "789 Oak St, TX",
      nationality: "British",
      idType: "Driver License",
      idNumber: "C56789012",
    },
  ];

  // Test 1
  test("renders table with correct data", () => {
    render(<CustomTable data={mockData} columns={guestColumns} />);

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("+1 555 678 123")).toBeInTheDocument();
    expect(screen.getByText("B98765432")).toBeInTheDocument();
    expect(screen.getByText("Canadian")).toBeInTheDocument();
  });

  // Test 2
  test("sorts columns when header is clicked", () => {
    render(<CustomTable data={mockData} columns={guestColumns} />);

    fireEvent.click(screen.getByText("Full Name"));
    const rowsAfterFirstClick = screen.getAllByRole("row").splice(1);
    expect(rowsAfterFirstClick[0]).toHaveTextContent("Alice Alexander");
    expect(rowsAfterFirstClick[1]).toHaveTextContent("Alice Johnson");
    expect(rowsAfterFirstClick[2]).toHaveTextContent("John Doe");
  });

  // Test 3
  test("handles row selection when enabled", () => {
    const mockSelect = jest.fn();

    render(
      <CustomTable
        data={mockData}
        columns={guestColumns}
        EnableSelection={true}
        onSelectionChange={mockSelect}
      />
    );

    const radioButtons = screen.getAllByRole("radio");
    fireEvent.click(radioButtons[0]);
    expect(mockSelect).toHaveBeenCalledWith(mockData[0]);
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();
  });

  // Test 4
  test("displays empty state when no data", () => {
    render(<CustomTable data={[]} columns={guestColumns} />);

    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  // Test 5
  test("calls onAddClick when add button is clicked", () => {
    const mockOnAddClick = jest.fn();

    render(
      <CustomTable
        data={mockData}
        columns={guestColumns}
        addButtonText="Add Guest"
        onAddClick={mockOnAddClick}
      />
    );

    fireEvent.click(screen.getByText("Add Guest"));
    expect(mockOnAddClick).toHaveBeenCalled();
  });

  // Test 6
  test("calls onEditClick when edit button is clicked", () => {
    const mockOnEditClick = jest.fn();

    render(
      <CustomTable
        data={mockData}
        columns={guestColumns}
        meta={{ onEditClick: mockOnEditClick }}
      />
    );

    const editButtons = screen.getAllByLabelText("edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEditClick).toHaveBeenCalledWith(mockData[0]);
  });

  // Test 7
  test("calls onDeleteClick when delete button is confirmed", async () => {
    const mockOnDeleteClick = jest.fn();

    render(
      <CustomTable
        data={mockData}
        columns={guestColumns}
        meta={{ onDeleteClick: mockOnDeleteClick }}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-btn");
    fireEvent.click(deleteButtons[0]);

    const confirmButton = await screen.findByText("Delete");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnDeleteClick).toHaveBeenCalledWith(mockData[0]);
    });
  });

  // Test 8
  test("filters data based on text input", () => {
    render(<CustomTable data={mockData} columns={guestColumns} />);

    const filterInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(filterInput, { target: { value: "Alice" } });

    const filteredRows = screen.getAllByRole("row").splice(1);
    expect(filteredRows.length).toBe(2);

    fireEvent.change(filterInput, { target: { value: "" } });
    const allRows = screen.getAllByRole("row").splice(1);
    expect(allRows.length).toBe(mockData.length);

    fireEvent.change(filterInput, { target: { value: "Mikias" } });
    const noResults = screen.getByText("No records found");
    expect(noResults).toBeInTheDocument();

    fireEvent.change(filterInput, { target: { value: "John Doe" } });
    const filteredRow = screen.getAllByRole("row").splice(1);
    expect(filteredRow.length).toBe(1);
    expect(filteredRow[0]).toHaveTextContent("John Doe");
  });
});
