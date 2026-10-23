export const DEFAULT_ABILITY_FLAGS: string[] = [
  "FasterEggHatching"
];

export const DEFAULT_ENCOUNTER_TYPES: string[] = [
  "Land",
  "LandMorning",
  "LandDay",
  "LandAfternoon",
  "LandEvening",
  "LandNight",
  "PokeRadar",
  "Cave",
  "CaveMorning",
  "CaveDay",
  "CaveAfternoon",
  "CaveEvening",
  "CaveNight",
  "Water",
  "WaterMorning",
  "WaterDay",
  "WaterAfternoon",
  "WaterEvening",
  "WaterNight",
  "OldRod",
  "GoodRod",
  "SuperRod",
  "RockSmash",
  "HeadbuttLow",
  "HeadbuttHigh",
  "BugContest"
];

export const DEFAULT_FIELD_USES: string[] = [
  "OnPokemon",
  "Direct",
  "TR",
  "TM",
  "TM"
];

export const DEFAULT_BATTLE_USES: string[] = [
  "OnPokemon",
  "OnMove",
  "OnBattler",
  "OnFoe",
  "Direct"
];

export const DEFAULT_ITEM_FLAGS: string[] =[
  "Mail",
  "IconMail",
  "PokeBall",
  "SnagBall",
  "Berry",
  "KeyItem",
  "EvolutionStone",
  "Fossil",
  "Apricorn",
  "TypeGem",
  "Mulch",
  "MegaStone",
  "MegaRing",
  "Repel"
];

export const DEFAULT_WEATHERS: string[] = [
  "Rain",
  "HeavyRain",
  "Storm",
  "Snow",
  "Blizzard",
  "Sandstorm",
  "Sun",
  "Fog"
];

export const DEFAULT_ENVIRONMENTS: string[] = [
  "None",
  "Grass",
  "TallGrass",
  "MovingWater",
  "StillWater",
  "Puddle",
  "Underwater",
  "Cave",
  "Rock",
  "Sand",
  "Forest",
  "ForestGrass",
  "Snow",
  "Ice",
  "Volcano",
  "Graveyard",
  "Sky",
  "Space",
  "UltraSpace"
];

export const DEFAULT_MAP_FLAGS: string[] = [
  "DisableBoxLink",
  "HideEncountersInPokedex",
  "MossRock",
  "IceRock",
  "Magnetic",
  "DistortionWorld",
  "enExtPrev",
  "disExtPrev"
];

export const DEFAULT_TARGETS: string[] = [
  "None",
  "User",
  "NearAlly",
  "UserOrNearAlly",
  "AllAllies",
  "UserAndAllies",
  "NearFoe",
  "RandomNearFoe",
  "AllNearFoes",
  "Foe",
  "AllFoes",
  "NearOther",
  "AllNearOthers",
  "Other",
  "AllBattlers",
  "UserSide",
  "FoeSide",
  "BothSides"
];

export const DEFAULT_MOVE_FLAGS: string[] = [
  "Contact",
  "CanProtect",
  "CanMirrorMove",
  "ThawsUser",
  "HighCriticalHitRate",
  "Biting",
  "Punching",
  "Sound",
  "Powder",
  "Pulse",
  "Bomb",
  "Dance",
  "CannotMetronome",
  "TramplesMinimize"
];

export const DEFAULT_GENDER_RATIOS: string[] = [
  "AlwaysMale",
  "FemaleOneEigth",
  "Female25Procent",
  "Female50Procent",
  "Female75Procent",
  "FemaleSevenEigths",
  "AlwaysFemale",
  "Genderless"
];

export const DEFAULT_GROWTH_RATES: string[] = [
  "Fast",
  "Medium",
  "Slow",
  "Parabolic",
  "Erratic",
  "Fluctating"
];

export const DEFAULT_EGG_GROUPS: string[] = [
  "Monster",
  "Water1",
  "Bug",
  "Flying",
  "Field",
  "Fairy",
  "Grass",
  "HumanLike",
  "Water3",
  "Mineral",
  "Amorphous",
  "Water2",
  "Ditto",
  "Dragon",
  "Undiscovered"
];

export const DEFAULT_COLORS: string[] = [
  "Black",
  "Blue",
  "Brown",
  "Gray",
  "Green",
  "Pink",
  "Purple",
  "Red",
  "White",
  "Yellow"
];

export const DEFAULT_SHAPES: string[] = [
  "Head",
  "Serpentine",
  "Finned",
  "HeadArms",
  "HeadBase",
  "BipedalTail",
  "HeadLegs",
  "Quadruped",
  "Winged",
  "Multiped",
  "MultiBody",
  "Bipedal",
  "MultiWinged",
  "Insectoid"
]; 

export const DEFAULT_HABITATS: string[] = [
  "None",
  "Cave",
  "Forest",
  "GrassLand",
  "Mountain",
  "Rare",
  "RoughTerrain",
  "Sea",
  "Urban",
  "WatersEdge"
];

export const DEFAULT_SPECIES_FLAGS: string[] = [
  "Legendary",
  "Mythical",
  "UltraBeast",
  "DefaultForm",
  "InheritFormFromMother",
  "InheritFormWithEverStone"
];

export const DEFAULT_EVOLUTIONS: [string, string?][] = [
  ["Level", "Level"],
  ["LevelMale", "Level"],
  ["LevelFemale", "Level"],
  ["LevelDay", "Level"],
  ["LevelNight", "Level"],
  ["LevelMorning", "Level"],
  ["LevelAfternoon", "Level"],
  ["LevelEvening", "Level"],
  ["LevelNoWeather", "Level"],
  ["LevelSun", "Level"],
  ["LevelRain", "Level"],
  ["LevelSnow", "Level"],
  ["LevelSandstorm", "Level"],
  ["LevelCycling", "Level"],
  ["LevelSurfing", "Level"],
  ["LevelDiving", "Level"],
  ["LevelDarkness", "Level"],
  ["LevelDarkInParty", "Level"],
  ["AttackGreater", "Level"],
  ["AtkDefEqual", "Level"],
  ["DefenseGreater", "Level"],
  ["Silcoon", "Level"],
  ["Cascoon", "Level"],
  ["Ninjask", "Level"],
  ["Happiness"],
  ["HappinessMale"],
  ["HappinessDay"],
  ["HappinessNight"],
  ["HappinessMove", "Move"],
  ["HappinessMoveType", "Type"],
  ["HappinessHoldItem", "Item"],
  ["MaxHappiness"],
  ["Beauty", "Number"],
  ["HoldItem", "Item"],
  ["HoldItemMale", "Item"],
  ["HoldItemFemale", "Item"],
  ["DayHoldItem", "Item"],
  ["NightHoldItem", "Item"],
  ["HoldItemHappiness", "Item"],
  ["HasMove", "Move"],
  ["HasMoveType", "Type"],
  ["HasInParty", "Species"],
  ["Location", "MapID"],
  ["LocationFlag", "MapFlag"],
  ["Region", "RegionID"],
  ["Item", "Item"],
  ["ItemMale", "Item"],
  ["ItemFemale", "Item"],
  ["ItemDay", "Item"],
  ["ItemNight", "Item"],
  ["ItemHappiness", "Item"],
  ["Trade"],
  ["TradeMale"],
  ["TradeFemale"],
  ["TradeDay"],
  ["TradeNight"],
  ["TradeItem", "Item"],
  ["TradeSpecies", "Species"],
  ["BattleDealCriticalHit", "Number"],
  ["Event", "Number"],
  ["EventAfterDamageTaken", "Number"],
  ["Shedinja"],
  ["None"]
];

export const DEFAULT_TRAINER_TYPE_FLAGS: string[] = [
  "PredictMoveFailure",
  "ScoreMoves",
  "PreferMultiTargetMoves",
  "HPAware",
  "ConsiderSwitching",
  "UsePokemonInOrder",
  "ReserveLastPokemon"
];

export const DEFAULT_TYPE_FLAGS: string[] = [

];