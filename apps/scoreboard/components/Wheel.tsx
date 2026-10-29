"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface WheelOption {
  id: string;
  label: string;
  color: string;
}

interface Props {
  options: WheelOption[];
  size?: number;
  spinToken: number;
  onFinish: (option: WheelOption, index: number) => void;
}

const VIEWBOX = 300;
const CENTER = VIEWBOX / 2;
const RADIUS = 140;

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function describeSlice(startAngle: number, endAngle: number): string {
  const start = polarToCartesian(startAngle, RADIUS);
  const end = polarToCartesian(endAngle, RADIUS);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

export default function Wheel({ options, size = 640, spinToken, onFinish }: Props) {
  const [rotation, setRotation] = useState(0);
  const pendingWinner = useRef<{ option: WheelOption; index: number } | null>(null);
  const lastHandledToken = useRef(0);

  const segment = 360 / options.length;
  const fontSize = options.length > 12 ? 8 : options.length > 7 ? 10 : 12;

  useEffect(() => {
    if (spinToken <= 0 || spinToken === lastHandledToken.current) return;
    lastHandledToken.current = spinToken;

    const winnerIndex = Math.floor(Math.random() * options.length);
    const winnerCenterAngle = winnerIndex * segment + segment / 2;
    const jitter = (Math.random() - 0.5) * segment * 0.6;
    const extraSpins = 8 + Math.floor(Math.random() * 3);

    const currentMod = ((rotation % 360) + 360) % 360;
    const targetMod = (360 - winnerCenterAngle - jitter + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;

    pendingWinner.current = { option: options[winnerIndex], index: winnerIndex };
    setRotation(rotation + delta + extraSpins * 360);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinToken]);

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} width={size} height={size}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS + 4}
          fill="#111827"
          stroke="#374151"
          strokeWidth={4}
        />
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ duration: 4.2, ease: [0.18, 0.74, 0.22, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          onAnimationComplete={() => {
            if (!pendingWinner.current) return;
            const { option, index } = pendingWinner.current;
            pendingWinner.current = null;
            onFinish(option, index);
          }}
        >
          {options.map((option, i) => {
            const startAngle = i * segment;
            const endAngle = startAngle + segment;
            const midAngle = startAngle + segment / 2;
            const labelPos = polarToCartesian(midAngle, RADIUS * 0.8);

            return (
              <g key={option.id}>
                <path
                  d={describeSlice(startAngle, endAngle)}
                  fill={option.color}
                  stroke="#111827"
                  strokeWidth={2}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={fontSize}
                  fontWeight={600}
                  fill="white"
                  style={{
                    textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                  }}
                >
                  {option.label}
                </text>
              </g>
            );
          })}
        </motion.g>
        <circle cx={CENTER} cy={CENTER} r={18} fill="#111827" stroke="white" strokeWidth={3} />
        <polygon
          points={`${CENTER - 14},0 ${CENTER + 14},0 ${CENTER},26`}
          fill="#facc15"
          stroke="#111827"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
