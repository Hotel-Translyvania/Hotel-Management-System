import { render, screen } from "@testing-library/react";
import UserAvatar from "../UserAvatar";

describe("UserAvatar", () => {
  it("renders the avatar with the correct alt text", () => {
    render(<UserAvatar name="Jane Doe" imageSrc="avatar.png" />);

    expect(screen.getByAltText("JD")).toBeInTheDocument();
  });
});
