import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Pages/Auth/Login"; // Adjust path as needed
import { BrowserRouter } from "react-router-dom";

// Helper to render with Router context
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Login Page", () => {
  test("renders login form correctly", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("shows required validation errors when fields are empty", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  test("shows error for invalid email format", async () => {
    renderWithRouter(<Login />);
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
  });

  test("submits form with correct data", async () => {
    renderWithRouter(<Login />);

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Login successful! Redirecting...")
      ).toBeInTheDocument();
    });
  });

  test("displays loading spinner during submission", async () => {
    renderWithRouter(<Login />);
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText("Login successful! Redirecting...")
      ).toBeInTheDocument()
    );
  });
});
