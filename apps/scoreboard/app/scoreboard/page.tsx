"use client";
import Image from "next/image";
import { ColorButton } from "ui"; 
import FadeImage from "@/components/FadeImage";
import Dropdown from "@/components/Dropdown";
import StateRadio from "@/components/RadioButtons";
import { SpeciesEntry } from "@/lib/getAllSpecies";
import { useEffect, useState } from "react";

interface SpeciesType {
  species: string;
  state: "active" | "idle" | "defeated" | "";
}

type Row = {
  left: SpeciesType;
  right: SpeciesType;
}

export default function Scoreboard() {
  const [options, setOptions] = useState<SpeciesEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [rows, setRows] = useState<Row[]>([
    {
      left: { species: "", state: "" },
      right: { species: "", state: "" }
    }
  ]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("/api/scoreboard");
        if (!res.ok) throw new Error("Failed to fetch scoreboard options");
        setOptions(await res.json());
      } catch (error) {
        setError("An error occured while fetching options for scoreboard.");
        console.error("Error fetching options for scoreboard:", error);
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isFull =
        window.innerHeight === screen.height &&
        window.innerWidth === screen.width;
      setIsFullScreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    window.addEventListener("resize", handleFullScreenChange);

    handleFullScreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      window.removeEventListener("resize", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (isFullScreen) {
      navbar.style.top = "-48px";
      window.scrollTo({ top: 48, behavior: "smooth" })
      document.body.style.overflow = "hidden";
    } else {
      navbar.style.top = "0";
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFullScreen]);

  if (options.length < 1) {
    return <p className="mt-8 text-center text-white">Loading...</p>
  }

  if (error) {
    return <p className="mt-8 text-center text-red-500">{error}</p>
  }
}