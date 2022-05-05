import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import { render, screen, waitFor } from "./test-utils";

const server = setupServer(
  rest.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0",
    (req, res, ctx) => {
      return res(
        ctx.json({
          count: 1126,
          next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
          previous: null,
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Basic test over App", () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  it("Renders a title", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Pokedex")).toBeInTheDocument();
  });

  it("Should show loading spinner while fetching name and url from API", async () => {
    render(<App />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("Should show Ivysaur card", async () => {
    render(<App />);
    const promise = await screen.findByTestId("pokemon-card");

    await waitFor(() => promise);
    const DetailButton = screen.getByText("Ivysaur") as HTMLElement;
    expect(DetailButton).toBeInTheDocument();
  });
});
