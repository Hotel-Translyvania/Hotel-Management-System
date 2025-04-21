import { render, screen, fireEvent } from "@testing-library/react";
import DeleteAccountDialog from "../DeleteAccountDialog";

describe("DeleteAccountDialog", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  it("renders the dialog with correct content", () => {
    render(
      <DeleteAccountDialog isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Are you sure you want to permanently delete your account? This action is irreversible and will remove all your data including booking history."
      )
    ).toBeInTheDocument();
  });

  it("calls onConfirm when the delete button is clicked", () => {
    render(
      <DeleteAccountDialog isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    fireEvent.click(screen.getByText("Delete Account"));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("calls onClose when the cancel button is clicked", () => {
    render(
      <DeleteAccountDialog isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});