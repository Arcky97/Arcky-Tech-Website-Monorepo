"use client";
import { ColorButton } from "ui";
import Wheel, { WheelOption } from "@/components/Wheel";
import { GENERATIONS, ROLE_COLORS, type Generation } from "@/config/randomWheel";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const GENERATION_OPTIONS: WheelOption[] = GENERATIONS.map((gen) => ({
  id: `gen-${gen.id}`,
  label: gen.label,
  color: gen.color,
}));

const WHEEL_SIZE = 640;
const BLOCK_WIDTH = WHEEL_SIZE + 40;
const FULL_SHIFT = WHEEL_SIZE + 20;
const HALF_SHIFT = FULL_SHIFT / 2;
const SLIDE_TRANSITION = { duration: 0.6, ease: "easeInOut" as const };

type Phase = "stage1" | "stage2" | "complete";

export default function RandomWheel() {
  const [resetKey, setResetKey] = useState(0);

  const [generationSpinToken, setGenerationSpinToken] = useState(0);
  const [isSpinningGeneration, setIsSpinningGeneration] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);

  const [bossSpinToken, setBossSpinToken] = useState(0);
  const [isSpinningBoss, setIsSpinningBoss] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState<Generation["bosses"][number] | null>(null);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const phase: Phase = !selectedGeneration ? "stage1" : !selectedBoss ? "stage2" : "complete";

  const bossOptions: WheelOption[] = useMemo(() => {
    if (!selectedGeneration) return [];
    return selectedGeneration.bosses.map((boss) => ({
      id: boss.id,
      label: boss.name,
      color: ROLE_COLORS[boss.role],
    }));
  }, [selectedGeneration]);

  function handleSpinGeneration() {
    if (isSpinningGeneration) return;
    setIsSpinningGeneration(true);
    setGenerationSpinToken((t) => t + 1);
  }

  function handleGenerationFinish(option: WheelOption) {
    const genId = Number(option.id.replace("gen-", ""));
    const gen = GENERATIONS.find((g) => g.id === genId) ?? null;
    setSelectedGeneration(gen);
    setSelectedBoss(null);
    setBossSpinToken(0);
    setIsSpinningGeneration(false);
  }

  function handleSpinBoss() {
    if (isSpinningBoss) return;
    setIsSpinningBoss(true);
    setBossSpinToken((t) => t + 1);
  }

  function handleBossFinish(option: WheelOption) {
    const boss = selectedGeneration?.bosses.find((b) => b.id === option.id) ?? null;
    setSelectedBoss(boss);
    setIsSpinningBoss(false);
    // Let the wheels settle into their "complete" layout before popping the modal.
    setTimeout(() => setIsResultModalOpen(true), SLIDE_TRANSITION.duration * 1000 + 50);
  }

  function handleReset() {
    setIsResultModalOpen(false);
    setSelectedGeneration(null);
    setSelectedBoss(null);
    setGenerationSpinToken(0);
    setBossSpinToken(0);
    setIsSpinningGeneration(false);
    setIsSpinningBoss(false);
    setResetKey((k) => k + 1);
  }

  function handleCloseModal() {
    setIsResultModalOpen(false);
  }

  const genWheelTarget =
    phase === "stage1"
      ? { x: 0, opacity: 1 }
      : phase === "stage2"
      ? { x: -FULL_SHIFT, opacity: 0 }
      : { x: -HALF_SHIFT, opacity: 1 };

  const bossWheelTarget = phase === "complete" ? { x: HALF_SHIFT, opacity: 1 } : { x: 0, opacity: 1 };

  return (
    <div className="relative flex flex-col items-center min-h-screen overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size background panned via CSS, not a responsive content image */}
      <img
        src="/images/random-wheel/background.png"
        alt=""
        width={2560}
        height={1440}
        className="absolute top-1/2 left-1/2 -z-10 w-[2560px] h-360 max-w-none RandomWheelBackgroundPan pointer-events-none select-none opacity-100"
      />
      <h1 className="head1">Random Boss Wheel</h1>
      <p className="text-center text-body max-w-xl">
        Spin the wheel to pick a generation, then spin again to pick a boss
        from that generation!
      </p>

      <div
        className="relative w-full flex justify-center mt-4"
        style={{ minHeight: WHEEL_SIZE + 160 }}
      >
        <motion.div
          className="absolute top-0 flex flex-col items-center gap-4"
          style={{ width: BLOCK_WIDTH, left: "50%", marginLeft: -BLOCK_WIDTH / 2 }}
          animate={genWheelTarget}
          transition={SLIDE_TRANSITION}
        >
          <h2 className="head3">Stage 1: Pick a Generation</h2>
          <Wheel
            key={`generation-${resetKey}`}
            size={WHEEL_SIZE}
            options={GENERATION_OPTIONS}
            spinToken={generationSpinToken}
            onFinish={handleGenerationFinish}
          />
          <ColorButton
            color="blue-600"
            text={isSpinningGeneration ? "Spinning..." : "Spin for Generation"}
            action={handleSpinGeneration}
            disabled={isSpinningGeneration || selectedGeneration !== null}
          />
        </motion.div>

        {selectedGeneration && (
          <motion.div
            className="absolute top-0 flex flex-col items-center gap-4"
            style={{ width: BLOCK_WIDTH, left: "50%", marginLeft: -BLOCK_WIDTH / 2 }}
            initial={{ x: FULL_SHIFT, opacity: 0 }}
            animate={bossWheelTarget}
            transition={SLIDE_TRANSITION}
          >
            <h2 className="head3 text-center">
              Stage 2: Pick a Boss from {selectedGeneration.label} ({selectedGeneration.region})
            </h2>
            <Wheel
              key={`boss-${selectedGeneration.id}-${resetKey}`}
              size={WHEEL_SIZE}
              options={bossOptions}
              spinToken={bossSpinToken}
              onFinish={handleBossFinish}
            />
            <ColorButton
              color={selectedBoss ? "amber-600" : "emerald-600"}
              text={isSpinningBoss ? "Spinning..." : selectedBoss ? "View Result" : "Spin for Boss"}
              action={selectedBoss ? () => setIsResultModalOpen(true) : handleSpinBoss}
              disabled={isSpinningBoss}
            />
          </motion.div>
        )}
      </div>

      <div
        className={`modal-overlay ${isResultModalOpen ? "show backdrop-blur-xs" : "hide pointer-events-none"}`}
        onClick={handleCloseModal}
      >
        <div
          className={`modal-content ${isResultModalOpen ? "show" : "hide"} w-105 max-w-[95%]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h1 className="modal-title text-3xl">🎉 Final Result</h1>
            <ColorButton color="red-800" text="Close" action={handleCloseModal} />
          </div>
          <div className="modal-body px-6 py-6 flex flex-col items-center gap-3">
            {selectedBoss && selectedGeneration && (
              <>
                <p className="text-2xl font-bold text-white">{selectedBoss.name}</p>
                <p className="text-gray-400">{selectedBoss.role}</p>
                <p className="text-gray-400 text-sm">
                  {selectedGeneration.label} ({selectedGeneration.region})
                </p>
                <ColorButton color="amber-600" text="Spin Again" action={handleReset} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
