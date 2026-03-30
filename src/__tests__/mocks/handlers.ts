import { http, HttpResponse } from "msw";

const makePokemon = (id: number, name: string, types: string[], hp = 45) => ({
  id, name, base_experience: 64, height: 7, weight: 69,
  types: types.map((t, i) => ({ slot: i + 1, type: { name: t, url: "" } })),
  stats: [
    { base_stat: hp, stat: { name: "hp", url: "" } },
    { base_stat: 49, stat: { name: "attack", url: "" } },
    { base_stat: 49, stat: { name: "defense", url: "" } },
    { base_stat: 65, stat: { name: "special-attack", url: "" } },
    { base_stat: 65, stat: { name: "special-defense", url: "" } },
    { base_stat: 45, stat: { name: "speed", url: "" } },
  ],
  abilities: [
    { ability: { name: "overgrow", url: "" }, is_hidden: false },
    { ability: { name: "chlorophyll", url: "" }, is_hidden: true },
  ],
  moves: [{ move: { name: "tackle", url: "" } }],
  sprites: { front_default: `https://pokeapi.co/sprites/${id}.png`, front_shiny: null, back_default: null },
});

export const bulbasaur = makePokemon(1, "bulbasaur", ["grass", "poison"], 45);
export const charmander = makePokemon(4, "charmander", ["fire"], 39);
export const squirtle = makePokemon(7, "squirtle", ["water"], 44);

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", () =>
    HttpResponse.json({
      count: 3,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
      ],
    })
  ),
  http.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", () => HttpResponse.json(bulbasaur)),
  http.get("https://pokeapi.co/api/v2/pokemon/charmander", () => HttpResponse.json(charmander)),
  http.get("https://pokeapi.co/api/v2/pokemon/squirtle", () => HttpResponse.json(squirtle)),
];