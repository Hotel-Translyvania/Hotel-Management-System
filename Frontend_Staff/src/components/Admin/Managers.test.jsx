import { render, screen, fireEvent } from "@testing-library/react";
import Managers from "./Managers";
import { Dialog } from "@/components/ui/dialog";

// Mocking the Dialog component
jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, onOpenChange, children }) => (
    open ? (
      <div>
        <button onClick={() => onOpenChange(false)}>Close Modal</button>
        {children}
      </div>
    ) : null
  ),
  DialogContent: ({ children }) => <div>{children}</div>,
}));

describe("Managers Component", () => {
  it("opens the AddManager modal when the 'Add Manager' button is clicked", () => {
    render(<Managers />);

    // Click the 'Add Manager' button
    fireEvent.click(screen.getByText(/Add Manager/i));
    
    // Check if the modal is displayed
    expect(screen.getByText(/Add Manager/i)).toBeInTheDocument();
  });

  it("closes the AddManager modal when the close button is clicked", () => {
    render(<Managers />);
    
    // Open the modal first
    fireEvent.click(screen.getByText(/Add Manager/i));
    
    // Click the Close button
    fireEvent.click(screen.getByText(/Close Modal/i));
    
    // Check if the modal is closed
    expect(screen.queryByText(/Add Manager/i)).not.toBeInTheDocument();
  });

  it("renders the AddManager component inside the modal", () => {
    render(<Managers />);

    // Open the modal first
    fireEvent.click(screen.getByText(/Add Manager/i));

    // Check if the AddManager form is rendered inside the modal
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
});
