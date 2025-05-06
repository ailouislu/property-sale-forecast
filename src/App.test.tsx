import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

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
        <App />
      </MemoryRouter>
    );

    const logo = await screen.findByAltText("NZLouis.com");
    expect(logo).toHaveAttribute("src", "mocked-nzlouis.jpg");

    const propertyLink = screen.getByRole("link", { name: /Properties/i });

    expect(propertyLink).toBeInTheDocument();
  });

  test("renders PropertyList component when at '/property' route", async () => {
    render(
      <MemoryRouter initialEntries={["/property"]}>
        <App />
      </MemoryRouter>
    );

    await screen.findByText(/Loading.../i);
    const Properties = await screen.findByText(/Predicted Properties/i);
    expect(Properties).toBeInTheDocument();
  });

  test("renders NotFound component when at unknown route", async () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );

    const notFound = await screen.findByTestId("not-found");
    expect(notFound).toBeInTheDocument();
  });
});
