import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { server } from "./mocks/server";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

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

describe("Type filters", () => {
  it("renders type filter chips after load", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("type-filter-fire")).toBeInTheDocument();
    });
  });

  it("filters to only fire Pokemon when fire chip clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByTestId("type-filter-fire"));
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  it("supports multi-select", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByTestId("type-filter-fire"));
    await user.click(screen.getByTestId("type-filter-water"));
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("squirtle")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  it("clear button resets all filters", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByTestId("type-filter-fire"));
    await user.click(screen.getByText("clear"));
    expect(screen.getAllByTestId("pokemon-card")).toHaveLength(3);
  });
});

describe("Sort", () => {
  it("sorts by name alphabetically", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.selectOptions(screen.getByTestId("sort-select"), "name");
    const cards = screen.getAllByTestId("pokemon-card");
    expect(within(cards[0]).getByText("bulbasaur")).toBeInTheDocument();
  });

  it("sorts by HP descending", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.selectOptions(screen.getByTestId("sort-select"), "hp");
    const cards = screen.getAllByTestId("pokemon-card");
    expect(within(cards[0]).getByText("bulbasaur")).toBeInTheDocument();
  });
});

describe("Error handling", () => {
  it("shows error message when API fails", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon", () => HttpResponse.error())
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});

describe("Detail page", () => {
  it("navigates to detail when card is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByText("bulbasaur"));
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("bulbasaur");
    });
  });

  it("shows Base Stats on detail page", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByText("bulbasaur"));
    await waitFor(() => {
      expect(screen.getByText("Base Stats")).toBeInTheDocument();
    });
  });

  it("navigates back to list", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    await user.click(screen.getByText("bulbasaur"));
    await waitFor(() => screen.getByRole("heading", { level: 1 }));
    await user.click(screen.getAllByText(/← back/i)[0]);
    await waitFor(() => {
      expect(screen.getAllByTestId("pokemon-card")).toHaveLength(3);
    });
  });
});

describe("Accessibility", () => {
  it("cards have aria-label", async () => {
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    expect(screen.getByLabelText("View bulbasaur")).toBeInTheDocument();
  });

  it("cards are keyboard navigable with Enter", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => screen.getAllByTestId("pokemon-card"));
    screen.getByLabelText("View bulbasaur").focus();
    await user.keyboard("{Enter}");
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("bulbasaur");
    });
  });
});