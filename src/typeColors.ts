export interface TypeColor {
  bg: string;
  light: string;
  text: string;
}

const TYPE_COLORS: Record<string, TypeColor> = {
  fire: { bg: "#FF6B35", light: "#FFF0EB", text: "#7A2500" },
  water: { bg: "#4A90D9", light: "#EBF4FF", text: "#0B3D6B" },
  grass: { bg: "#3DAA6A", light: "#EAFAF1", text: "#1A4D30" },
};

export const getTypeColor = (type: string): TypeColor =>
  TYPE_COLORS[type] ?? { bg: "#888", light: "#f0f0f0", text: "#333" };