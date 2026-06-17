"use client";

interface Props {
  rowIndex: number;
  side: "left" | "right";
  selectedState: string;
  species: string;
  onChange: (state: string) => void;
}

export default function StateRadio ({ rowIndex, side, selectedState, species, onChange }: Props) {
  const states = ["active", "idle", "defeated"];
  return (
    <div className="flex gap-2">
      {states.map(stateValue => (
        <label
          key={stateValue}
          className="flex items-center gap-1"
          style={{
            textShadow: `
              -1px -1px 0 black,
              1px -1px 0 black,
              -px 1px 0 black,
              1px 1px 0 black
            `
          }}
        >
          <input
            type="radio"
            name={`state-${rowIndex}-${side}`}
            value={stateValue}
            checked={selectedState === stateValue}
            disabled={!species}
            onChange={() => onChange(stateValue)}
          />
          {stateValue}
        </label>
      ))}
    </div>
  )
}