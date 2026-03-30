import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import App from "../App";

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