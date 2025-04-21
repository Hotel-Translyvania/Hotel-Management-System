import { render, screen, fireEvent } from "@testing-library/react";
import EditProfileForm from "../EditProfileForm";
import { ProfileData } from "@/types/profile";
import '@testing-library/jest-dom'; // Add this import

describe("EditProfileForm", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockProfileData: ProfileData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      gender: "male",
      address: "123 Street",
      nationality: "Ethiopian",
      dateOfBirth: "2000-01-01",
      identificationType: "passport",
      identificationNumber: "AA1234567",
      picture: ""
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with correct fields", () => {
    render(
      <EditProfileForm
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        profileData={mockProfileData}
      />
    );

    // Use toHaveValue for input elements
    expect(screen.getByLabelText("Full Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
    expect(screen.getByLabelText("Phone")).toHaveValue("1234567890");
  });

  it("calls onSave when the save button is clicked", () => {
    render(
      <EditProfileForm
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        profileData={mockProfileData}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      firstName: "John",
      lastName: "Doe"
    }));
  });

  it("calls onClose when the cancel button is clicked", () => {
    render(
      <EditProfileForm
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        profileData={mockProfileData}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});