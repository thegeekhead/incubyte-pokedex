import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Listing page", () => {
  it("renders the page heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders all fetched Pokemon as cards after load", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("pokemon-card").length).toBe(3);
    });
  });

  it("displays Pokemon names on cards", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.getByText("squirtle")).toBeInTheDocument();
    });
  });
});

// ADD below existing describe block
describe("Search filtering", () => {
  it("filters by name as user types", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.type(screen.getByTestId("search-input"), "char");
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  it("is case-insensitive", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.type(screen.getByTestId("search-input"), "BULBA");
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("filters by Pokedex number", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.type(screen.getByTestId("search-input"), "7");
    expect(screen.getByText("squirtle")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  it("shows no results message for unmatched query", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.type(screen.getByTestId("search-input"), "zzzzz");
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });
});