import { ReactNode } from "react";
import clsx from "clsx";
import { ColorType, IntensityType, getColorFromTailwindString } from "ui";

const getRandomColor = (): { color: ColorType; intensity: IntensityType } => {
  const colors: ColorType[] = [
    "red", "orange", "amber", "yellow", "lime", "green", "emerald", 
    "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", 
    "rose", "slate", "gray", "zinc", "neutral", "stone"
  ];
  
  const intensities: IntensityType[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
  
  return { color: randomColor, intensity: randomIntensity };
};

type CalloutType = "custom" | "hint" | "attention" | "warning" | "check" | "random";

const calloutStyles: Record<CalloutType, { border: string; bg: string; label: string }> = {
  custom: {
    border: "",
    bg: "",
    label: "custom"
  },
  hint: {
    border: getColorFromTailwindString("gray-500"),
    bg: getColorFromTailwindString("zinc-800"),
    label: "Hint"
  },
  attention: {
    border: getColorFromTailwindString("yellow-400"),
    bg: getColorFromTailwindString("yellow-900/40"),
    label: "Attention"
  },
  warning: {
    border: getColorFromTailwindString("red-500"),
    bg: getColorFromTailwindString("red-900/40"),
    label: "Warning"
  },
  check: {
    border: getColorFromTailwindString("green-500"),
    bg: getColorFromTailwindString("green-900/40"),
    label: "Check"
  },
  random: {
    border: "",
    bg: "",
    label: "Random",
  }
};

export function Callout ({ type = "custom", title = "", blend = "dark", color="blue-500", children }: { type?: CalloutType; title?: string; blend?:string; color?:string; children: ReactNode }) {
  let style = calloutStyles[type];

  if (type === "random") {
    const { color, intensity } = getRandomColor();
    style = {
      border: getColorFromTailwindString(`${color}-${intensity}`),
      bg: getColorFromTailwindString("gray-900/40"),  
      label: title
    };
  } else if (type === "custom") {
    style = {
      border: getColorFromTailwindString(color),
      bg: getColorFromTailwindString("gray-900/40"),
      label: title
    };
  }

  return (
    <blockquote
      className={clsx(
        `border-l-3 rounded-md py-4 pl-4 px-8 my-6 bg-linear-85 from-gray-700/20 ${blend === "dark" ? "to-gray-900" : "to-gray-800"}`,
        //style.border,
        //style.bg,
      )}
      style={{
        borderColor: style.border,
        backgroundColor: style.bg,
        //background: `linear-gradient(to right, #{style.bg} 0%, #{style.bg} 80%, rgba(0, 0, 0, 0) 100%)`
      }}
    >
      <strong 
        className={clsx(
          "block mb-1 font-semibold text-lg text-left"
        )}
        style={{ 
          color: !["random", "custom"].includes(type) ? style.border : ""
        }}
      >
        {title || style.label}
      </strong>
      <div className="text-left text-base">{children}</div>
    </blockquote>
  );
};
