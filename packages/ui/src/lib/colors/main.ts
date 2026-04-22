import { amber } from "./ambers";
import { blue } from "./blues";
import { cyan } from "./cyans";
import { emerald } from "./emeralds";
import { fuchsia } from "./fuchsias";
import { gray } from "./grays";
import { green } from "./greens";
import { indigo } from "./indigos";
import { lime } from "./limes";
import { neutral } from "./neutrals";
import { orange } from "./oranges";
import { pink } from "./pinks";
import { purple } from "./purples";
import { red } from "./reds";
import { rose } from "./roses";
import { sky } from "./skys";
import { slate } from "./slates";
import { stone } from "./stones";
import { teal } from "./teals";
import { violet } from "./violets";
import { yellow } from "./yellows";
import { zinc } from "./zincs";

export type ColorType = "black" | "white" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "slate" | "gray" | "zinc" | "neutral" | "stone";

export type IntensityType = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950"

export const tailwindColor: Record<string, Record<string, string>> = {
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  slate,
  gray,
  zinc,
  neutral,
  stone
};
