"use client";
import { ColorButton } from "ui";
import Wheel, { WheelOption } from "@/components/Wheel";
import { GENERATIONS, ROLE_COLORS, type Generation } from "@/config/randomWheel";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const GENERATION_OPTIONS: WheelOption[] = GENERATIONS.map((gen) => ({
  id: `gen-${gen.id}`,
  label: gen.label,
  color: gen.color,
}));

const WHEEL_SIZE = 760;
const BLOCK_WIDTH = WHEEL_SIZE + 40;
const FULL_SHIFT = WHEEL_SIZE + 20;
const HALF_SHIFT = FULL_SHIFT / 2;
const SLIDE_TRANSITION = { duration: 0.6, ease: "easeInOut" as const };
const FADE_TRANSITION = { duration: 0.8, ease: "easeInOut" as const };
const INTRO_DELAY_MS = 15_000;

const GENERATION_SPIN_DELAY_MS = 10_000;
const GENERATION_RESULT_DELAY_MS = 15_000;

const BOSS_SPIN_DELAY_MS = 15_000;

const GENERATION_WHEEL_RETURN_DELAY_MS = 3_000;
const RESULT_MODAL_DELAY_AFTER_WHEEL_MS = 10_000;
const RESULT_MODAL_DURATION_MS = 2_000;
const OUTRO_DELAY_MS = 5_000;

type Phase = "stage1" | "stage2" | "complete";

export default function RandomWheel() {
  const [resetKey, setResetKey] = useState(0);

  const [showContent, setShowContent] = useState(false);
  const [isOutro, setIsOutro] = useState(false);
  const [showBossWheel, setShowBossWheel] = useState(false);
  const generationTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const modalCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [generationSpinToken, setGenerationSpinToken] = useState(0);
  const [isSpinningGeneration, setIsSpinningGeneration] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);

  const [bossSpinToken, setBossSpinToken] = useState(0);
  const [isSpinningBoss, setIsSpinningBoss] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState<Generation["bosses"][number] | null>(null);

  const [showGenerationWheelAgain, setShowGenerationWheelAgain] = useState(false);
  const [moveBossWheelUp, setMoveBossWheelUp] = useState(false);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const phase: Phase = !showBossWheel 
    ? "stage1" 
    : !selectedBoss 
      ? "stage2" 
      : "complete";

  // Only the background animates for the first 15s after load/refresh.
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), INTRO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Clear any pending outro timer on unmount so it never fires after navigating away.
  useEffect(() => {
    return () => {
      [
        generationTransitionTimerRef,
        modalCloseTimerRef,
        outroTimerRef
      ].forEach((timerRef) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!showContent || showBossWheel || generationSpinToken > 0 || isSpinningGeneration) {
      return;
    }

    const timer = setTimeout(
      handleSpinGeneration,
      GENERATION_SPIN_DELAY_MS + SLIDE_TRANSITION.duration * 1000
    );

    return () => clearTimeout(timer);
  }, [showContent, showBossWheel, generationSpinToken, isSpinningGeneration]);

  useEffect(() => {
    if (!showBossWheel || bossSpinToken > 0 || isSpinningBoss) {
      return;
    }

    const timer = setTimeout(
      handleSpinBoss,
      BOSS_SPIN_DELAY_MS + SLIDE_TRANSITION.duration * 1000
    );

    return () => clearTimeout(timer);
  }, [showBossWheel, bossSpinToken, isSpinningBoss]);

  const bossOptions: WheelOption[] = useMemo(() => {
    if (!selectedGeneration) return [];

    const shuffledBosses = [...selectedGeneration.bosses];

    for (let i = shuffledBosses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBosses[i], shuffledBosses[j]] = [
        shuffledBosses[j],
        shuffledBosses[i]
      ];
    }

    return shuffledBosses.map((boss) => ({
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

    if (!gen) return;

    setSelectedGeneration(gen);
    setSelectedBoss(null);
    setBossSpinToken(0);
    setIsSpinningGeneration(false);

    generationTransitionTimerRef.current = setTimeout(() => {
      setShowBossWheel(true);
    }, GENERATION_RESULT_DELAY_MS);
  }

  function handleSpinBoss() {
    if (isSpinningBoss) return;
    setIsSpinningBoss(true);
    setBossSpinToken((t) => t + 1);
  }

  function handleBossFinish(option: WheelOption) {
    const boss = selectedGeneration?.bosses.find((b) => b.id === option.id) ?? null;

    if (!boss) return;

    setSelectedBoss(boss);
    setIsSpinningBoss(false);

    // First, wait before bringing back the generation wheel.
    setTimeout(() => {
      setShowGenerationWheelAgain(true);
      setMoveBossWheelUp(true);

      // Then wait for the generation wheel to finish sliding in.
      setTimeout(() => {
        handleOpenModal();
      }, SLIDE_TRANSITION.duration * 1000 + RESULT_MODAL_DELAY_AFTER_WHEEL_MS);

    }, GENERATION_WHEEL_RETURN_DELAY_MS);
  }

  function handleOpenModal() {
    setIsResultModalOpen(true);

    if (modalCloseTimerRef.current) {
      clearTimeout(modalCloseTimerRef.current);
    }

    modalCloseTimerRef.current = setTimeout(() => {
      handleCloseModal();
    }, RESULT_MODAL_DURATION_MS);
  }

  function handleReset() {
    // clear all pending timers.
    [
      generationTransitionTimerRef,
      modalCloseTimerRef,
      outroTimerRef
    ].forEach((timerRef) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    });

    setIsOutro(false);
    setIsResultModalOpen(false);

    setShowBossWheel(false);
    setSelectedGeneration(null);
    setSelectedBoss(null);

    setGenerationSpinToken(0);
    setBossSpinToken(0);

    setIsSpinningGeneration(false);
    setIsSpinningBoss(false);

    setShowGenerationWheelAgain(false);
    setMoveBossWheelUp(false);

    setResetKey((k) => k + 1);
  }

  function handleCloseModal() {
    if (modalCloseTimerRef.current) {
      clearTimeout(modalCloseTimerRef.current);
      modalCloseTimerRef.current = null;
    }

    setIsResultModalOpen(false);

    // After closing, wait before fading everything away.
    if (outroTimerRef.current) {
      clearTimeout(outroTimerRef.current);
    }

    outroTimerRef.current = setTimeout(() => {
      setIsOutro(true)
    }, OUTRO_DELAY_MS);
  }

  const contentVisible = showContent && !isOutro;

  const genWheelTarget = isOutro
    ? { x: -FULL_SHIFT * 1.5, opacity: 0 }
    : !showContent
    ? { x: 0, opacity: 0 }
    : phase === "stage1"
    ? { x: 0, opacity: 1 }
    : phase === "stage2"
    ? { x: -FULL_SHIFT, opacity: 0 }
    : showGenerationWheelAgain
    ? { x: -HALF_SHIFT, opacity: 1 }
    : { x: -FULL_SHIFT, opacity: 0 };

  const bossWheelTarget = isOutro
    ? { x: FULL_SHIFT * 1.5, opacity: 0 }
    : phase === "complete" && moveBossWheelUp
    ? { x: HALF_SHIFT, opacity: 1 }
    : { x: 0, opacity: 1 };

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
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={FADE_TRANSITION}
        style={{ pointerEvents: contentVisible ? "auto" : "none" }}
      >
        <h1 className="head1">Random Boss Wheel</h1>
        <p className="text-center text-body max-w-xl">
          Spin the wheel to pick a generation, then spin again to pick a boss
          from that generation!
        </p>
      </motion.div>

      <div
        className="relative w-full flex justify-center mt-4"
        style={{ minHeight: WHEEL_SIZE + 160, pointerEvents: contentVisible ? "auto" : "none" }}
      >
        <motion.div
          className="absolute top-0 flex flex-col items-center gap-4"
          style={{ width: BLOCK_WIDTH, left: "50%", marginLeft: -BLOCK_WIDTH / 2 }}
          initial={{ opacity: 0 }}
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

        {showBossWheel && selectedGeneration && (
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
              action={selectedBoss ? handleOpenModal : handleSpinBoss}
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
