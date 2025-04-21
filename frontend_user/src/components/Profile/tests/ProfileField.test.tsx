import { render, screen } from "@testing-library/react";
import ProfileField from "../ProfileField";

describe("ProfileField", () => {
  it("renders the field with label and value", () => {
    render(<ProfileField label="Email" value="test@example.com" />);

    expect(screen.getByText("Email")).not.toBeNull();
    expect(screen.getByText("test@example.com")).not.toBeNull();
  });
});