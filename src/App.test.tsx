import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

jest.mock("./components/Properties/PropertyList", () => ({
  __esModule: true,
  default: ({ properties }: { properties: any[] }) => (
    <div data-testid="property-list">
      {properties.length === 0 ? "No properties found." : "Properties found."}
    </div>
  ),
}));

jest.mock("./components/NotFound", () => ({
  __esModule: true,
  default: () => <div data-testid="not-found">Page not found</div>,
}));

jest.mock("./images/nzlouis.jpg", () => "mocked-nzlouis.jpg");

describe("App", () => {
  test("renders navigation bar with correct links and image", async () => {
    render(
      <MemoryRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </MemoryRouter>
    );

    const logo = await screen.findByAltText("NZLouis.com");
    expect(logo).toHaveAttribute("src", "mocked-nzlouis.jpg");

    const propertyLink = screen.getByRole("link", { name: /Properties/i });

    expect(propertyLink).toBeInTheDocument();
  });
});
