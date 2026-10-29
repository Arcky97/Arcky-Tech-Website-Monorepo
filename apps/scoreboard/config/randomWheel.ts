// Fixed configuration for the /random-wheel page.
//
// Stage 1 spins a wheel of Pokémon generations (1-9).
// Stage 2 spins a wheel of that generation's "bosses" (Gym Leaders / Trial
// Captains, Elite Four, Champions, Rivals and Evil Team bosses).

export type BossRole =
  | "Gym Leader"
  | "Trial Captain"
  | "Island Kahuna"
  | "Elite Four"
  | "Champion"
  | "Special Trainer"
  | "Rival"
  | "Evil Team Boss";

export interface Boss {
  id: string;
  name: string;
  role: BossRole;
}

export interface Generation {
  id: number;
  label: string;
  region: string;
  color: string;
  bosses: Boss[];
}

// One colour per role so the boss wheel is readable at a glance regardless
// of which generation is being spun.
export const ROLE_COLORS: Record<BossRole, string> = {
  "Gym Leader": "#3b82f6",
  "Trial Captain": "#3b82f6",
  "Island Kahuna": "#0ea5e9",
  "Elite Four": "#8b5cf6",
  "Champion": "#f59e0b",
  "Rival": "#22c55e",
  "Special Trainer": "#f59e0b",
  "Evil Team Boss": "#ef4444",
};

function boss(name: string, role: BossRole): Omit<Boss, "id"> {
  return { name, role };
}

interface RawGeneration {
  label: string;
  region: string;
  bosses: Omit<Boss, "id">[];
}

const rawGenerations: RawGeneration[] = [
  {
    label: "Generation 1",
    region: "Kanto",
    bosses: [
      boss("Brock", "Gym Leader"),
      boss("Misty", "Gym Leader"),
      boss("Lt. Surge", "Gym Leader"),
      boss("Erika", "Gym Leader"),
      boss("Koga", "Gym Leader"),
      boss("Sabrina", "Gym Leader"),
      boss("Blaine", "Gym Leader"),
      boss("Giovanni", "Gym Leader"),
      boss("Lorelei", "Elite Four"),
      boss("Bruno", "Elite Four"),
      boss("Agatha", "Elite Four"),
      boss("Lance", "Elite Four"),
      boss("Blue", "Champion"),
      boss("Giovanni", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 2",
    region: "Johto",
    bosses: [
      boss("Falkner", "Gym Leader"),
      boss("Bugsy", "Gym Leader"),
      boss("Whitney", "Gym Leader"),
      boss("Morty", "Gym Leader"),
      boss("Chuck", "Gym Leader"),
      boss("Jasmine", "Gym Leader"),
      boss("Pryce", "Gym Leader"),
      boss("Clair", "Gym Leader"),
      boss("Will", "Elite Four"),
      boss("Koga", "Elite Four"),
      boss("Bruno", "Elite Four"),
      boss("Karen", "Elite Four"),
      boss("Lance", "Champion"),
      boss("Silver", "Rival"),
      boss("Giovanni", "Evil Team Boss"),
      boss("red", "Champion")
    ],
  },
  {
    label: "Generation 3",
    region: "Hoenn",
    bosses: [
      boss("Roxanne", "Gym Leader"),
      boss("Brawly", "Gym Leader"),
      boss("Wattson", "Gym Leader"),
      boss("Flannery", "Gym Leader"),
      boss("Norman", "Gym Leader"),
      boss("Winona", "Gym Leader"),
      boss("Tate & Liza", "Gym Leader"),
      boss("Juan", "Gym Leader"),
      boss("Sidney", "Elite Four"),
      boss("Phoebe", "Elite Four"),
      boss("Glacia", "Elite Four"),
      boss("Drake", "Elite Four"),
      boss("Wallace", "Champion"),
      boss("Steven", "Special Trainer"),
      boss("May", "Rival"),
      boss("Brendan", "Rival"),
      boss("Maxie", "Evil Team Boss"),
      boss("Archie", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 4",
    region: "Sinnoh",
    bosses: [
      boss("Roark", "Gym Leader"),
      boss("Gardenia", "Gym Leader"),
      boss("Maylene", "Gym Leader"),
      boss("Crasher Wake", "Gym Leader"),
      boss("Fantina", "Gym Leader"),
      boss("Byron", "Gym Leader"),
      boss("Candice", "Gym Leader"),
      boss("Volkner", "Gym Leader"),
      boss("Aaron", "Elite Four"),
      boss("Bertha", "Elite Four"),
      boss("Flint", "Elite Four"),
      boss("Lucian", "Elite Four"),
      boss("Cynthia", "Champion"),
      boss("Barry", "Rival"),
      boss("Cyrus", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 5",
    region: "Unova",
    bosses: [
      boss("Cilan", "Gym Leader"),
      boss("Chili", "Gym Leader"),
      boss("Cress", "Gym Leader"),
      boss("Cheren", "Gym Leader"),
      boss("Roxanne", "Gym Leader"),
      boss("Lenora", "Gym Leader"),
      boss("Burgh", "Gym Leader"),
      boss("Elesa", "Gym Leader"),
      boss("Clay", "Gym Leader"),
      boss("Skyla", "Gym Leader"),
      boss("Brycen", "Gym Leader"),
      boss("Marlon", "Gym Leader"),
      boss("Drayden", "Gym Leader"),
      boss("Iris", "Gym Leader"),
      boss("Shauntal", "Elite Four"),
      boss("Marshal", "Elite Four"),
      boss("Grimsley", "Elite Four"),
      boss("Caitlin", "Elite Four"),
      boss("Alder", "Champion"),
      boss("Cheren", "Rival"),
      boss("Bianca", "Rival"),
      boss("Thug", "Rival"),
      boss("N", "Special Trainer"),
      boss("Ghetsis", "Evil Team Boss"),
      boss("Cynthia", "Special Trainer")
    ],
  },
  {
    label: "Generation 6",
    region: "Kalos",
    bosses: [
      boss("Viola", "Gym Leader"),
      boss("Grant", "Gym Leader"),
      boss("Korrina", "Gym Leader"),
      boss("Ramos", "Gym Leader"),
      boss("Clemont", "Gym Leader"),
      boss("Valerie", "Gym Leader"),
      boss("Olympia", "Gym Leader"),
      boss("Wulfric", "Gym Leader"),
      boss("Malva", "Elite Four"),
      boss("Siebold", "Elite Four"),
      boss("Wikstrom", "Elite Four"),
      boss("Drasna", "Elite Four"),
      boss("Diantha", "Champion"),
      boss("Serena", "Rival"),
      boss("Calem", "Rival"),
      boss("Lysandre", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 7",
    region: "Alola",
    bosses: [
      boss("Ilima", "Trial Captain"),
      boss("Lana", "Trial Captain"),
      boss("Kiawe", "Trial Captain"),
      boss("Mallow", "Trial Captain"),
      boss("Sophocles", "Trial Captain"),
      boss("Acerola", "Trial Captain"),
      boss("Mina", "Trial Captain"),
      boss("Hala", "Island Kahuna"),
      boss("Olivia", "Island Kahuna"),
      boss("Nanu", "Island Kahuna"),
      boss("Hapu", "Island Kahuna"),
      boss("Kukui", "Champion"),
      boss("Hau", "Rival"),
      boss("Guzma", "Evil Team Boss"),
      boss("Lusamine", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 8",
    region: "Galar",
    bosses: [
      boss("Milo", "Gym Leader"),
      boss("Nessa", "Gym Leader"),
      boss("Kabu", "Gym Leader"),
      boss("Bea", "Gym Leader"),
      boss("Allister", "Gym Leader"),
      boss("Opal", "Gym Leader"),
      boss("Gordie", "Gym Leader"),
      boss("Melony", "Gym Leader"),
      boss("Piers", "Gym Leader"),
      boss("Raihan", "Gym Leader"),
      boss("Leon", "Champion"),
      boss("Hop", "Rival"),
      boss("Bede", "Rival"),
      boss("Marnie", "Rival"),
      boss("Rose", "Evil Team Boss"),
      boss("Oleana", "Evil Team Boss"),
    ],
  },
  {
    label: "Generation 9",
    region: "Paldea",
    bosses: [
      boss("Katy", "Gym Leader"),
      boss("Brassius", "Gym Leader"),
      boss("Iono", "Gym Leader"),
      boss("Kofu", "Gym Leader"),
      boss("Larry", "Gym Leader"),
      boss("Ryme", "Gym Leader"),
      boss("Tulip", "Gym Leader"),
      boss("Grusha", "Gym Leader"),
      boss("Rika", "Elite Four"),
      boss("Poppy", "Elite Four"),
      boss("Hassel", "Elite Four"),
      boss("Geeta", "Champion"),
      boss("Nemona", "Rival"),
      boss("Arven", "Rival"),
      boss("Giacomo", "Evil Team Boss"),
      boss("Mela", "Evil Team Boss"),
      boss("Atticus", "Evil Team Boss"),
      boss("Ortega", "Evil Team Boss"),
      boss("Eri", "Evil Team Boss"),
    ],
  },
];

function generationColor(index: number, total: number): string {
  const hue = Math.round((360 / total) * index);
  return `hsl(${hue}, 65%, 50%)`;
}

export const GENERATIONS: Generation[] = rawGenerations.map((gen, genIndex) => ({
  id: genIndex + 1,
  label: gen.label,
  region: gen.region,
  color: generationColor(genIndex, rawGenerations.length),
  bosses: gen.bosses.map((b, bossIndex) => ({
    ...b,
    id: `gen-${genIndex + 1}-boss-${bossIndex}`,
  })),
}));

export function getGenerationById(id: number): Generation | undefined {
  return GENERATIONS.find((g) => g.id === id);
}
