import { tailwindColor } from "./../lib";

const hexToRgba = (hex: string, opacity: number): string => {
  const sanitizedHex = hex.replace("#", "");

  const bigInt = parseInt(sanitizedHex, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = (bigInt & 255);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const getTailwindColor = (
  color: string,
  intensity: string,
  opacity: number = 1
): string => {
  const hex = tailwindColor[color]?.[intensity];
  if (!hex) {
    console.warn(`Color ${color}-${intensity} not found`);
    return "transparent";
  }

  return hexToRgba(hex, opacity);
}

const parseTailwindColorString = (input: string): { color: string; intensity: string; opacity: number } => {
  const [colorIntensity, opacityRaw] = input.split('/');
  const [color, intensity] = colorIntensity.split('-');
  const opacity = parseInt(opacityRaw || "100", 10) / 100;
  return { color, intensity, opacity };
}

export const getColorFromTailwindString = (input: string): string => {
  const { color, intensity, opacity } = parseTailwindColorString(input);
  return getTailwindColor(color, intensity, opacity);
}