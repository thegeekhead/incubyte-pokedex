export interface TypeColor {
  bg: string;
  light: string;
  text: string;
}

const TYPE_COLORS: Record<string, TypeColor> = {
  fire: { bg: "#FF6B35", light: "#FFF0EB", text: "#7A2500" },
  water: { bg: "#4A90D9", light: "#EBF4FF", text: "#0B3D6B" },
  grass: { bg: "#3DAA6A", light: "#EAFAF1", text: "#1A4D30" },
  electric: { bg: "#F5C518", light: "#FFFBE6", text: "#5C4200" },
  ice: { bg: "#74CCF4", light: "#EBF9FF", text: "#0A4A6A" },
  fighting: { bg: "#C0392B", light: "#FDEDEC", text: "#6B1A14" },
  poison: { bg: "#9B59B6", light: "#F5EEF8", text: "#4A235A" },
  ground: { bg: "#D4A027", light: "#FDF6E3", text: "#5A3E00" },
  flying: { bg: "#7FB3D3", light: "#EBF5FB", text: "#1A3A50" },
  psychic: { bg: "#E91E8C", light: "#FDE8F3", text: "#7A0040" },
  bug: { bg: "#8BC34A", light: "#F1F8E9", text: "#33691E" },
  rock: { bg: "#9E8D60", light: "#F5F3EE", text: "#3E3220" },
  ghost: { bg: "#5B4E8A", light: "#EEE8F8", text: "#261A4A" },
  dragon: { bg: "#1A6EBF", light: "#E8F1FB", text: "#0A2D54" },
  dark: { bg: "#2D2D2D", light: "#EDEDED", text: "#111" },
  steel: { bg: "#778899", light: "#EEF2F5", text: "#2B3A45" },
  fairy: { bg: "#F48FB1", light: "#FEF0F5", text: "#7A1A40" },
  normal: { bg: "#A8A878", light: "#F5F5EE", text: "#3A3A28" },
};

export const getTypeColor = (type: string): TypeColor =>
  TYPE_COLORS[type] ?? { bg: "#888", light: "#f0f0f0", text: "#333" };