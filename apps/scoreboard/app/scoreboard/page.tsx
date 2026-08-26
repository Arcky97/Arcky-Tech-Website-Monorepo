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

  const handleRowChange = (
    rowIndex: number,
    side: "left" | "right",
    field: "species" | "state",
    value: string
  ) => {
    setRows(prev => {
      const activeIndex = prev.findIndex(
        (row, idx) => idx !== rowIndex && row[side].state === "active"
      );

      const updateRows = [...prev];
      let timeout = 0;

      if (activeIndex !== -1) {
        updateRows[activeIndex] = {
          ...updateRows[activeIndex],
          [side]: {
            ...updateRows[activeIndex][side],
            state: "idle"
          }
        };
        timeout = 1000;
      }

      setTimeout(() => {
        setRows(current => {
          return current.map((row, idx) => {
            if (idx !== rowIndex) return row;

            if (field === "species") {
              return {
                ...row,
                [side]: {
                  species: value,
                  state: value ? "active" : ""
                }
              };
            }
            return {
              ...row,
              [side]: { ...row[side], [field]: value}
            }
          });
        });
      }, timeout);
      return updateRows;
    });
  };

  const addRow = () => {
    if (rows.length < 6) {
      setRows(prev =>[
        ...prev,
        {
          left: { species: "", state: "" },
          right: { species: "", state: "" }
        }
      ]);
    }
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(prev => prev.slice(0, -1));
    }
  };

  const setDynamicSize = (state: string): number => {
    let size = 120;
    switch (state) {
      case "active":
        size = 168;
        break;
      case "idle":
        size = 128;
        break;
      case "defeated":
        size = 112;
        break;
    }
    return size;
  };

  const speciesOptions = options.map(({ name, file }) => ({
    value: file,
    label: name
  }));

  const getImageSrc = (species: string, state: string) => {
    if (!species || species === "empty") {
      return "/images/scoreboard/000.png";
    } else {
      return `/images/scoreboard/${state || "active"}/${species}`;
    };
  };

  const getPaddingByIndex = (side: string, index: number) => {
    if (index === 0 || index === 5) {
      return side === "left" ? "pl-11" : "pr-11";
    } else if (index === 1 || index === 4) {
      return side === "left" ? "pl-8" : "pr-8";
    } else {
      return side === "left" ? "pl-5" : "pr-5";
    }
  };

  return (
    <>
      {/* Background wrapper */}
      <div
        className="min-h-[calc(100dvh-189px)] w-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/scoreboard/background.jpg')"
        }}
      >
        {/* Fixed Buttons */}
        <div
          className={`fixed ${isFullScreen ? "top-5" : "top-26"} transition-all duration-600 ease-in-out left-1/2 -translate-x-1/2 mx-auto space-x-4`}
        >
          <ColorButton
            color="blue-700"
            text="Add Row"
            action={addRow}
            disabled={rows.length === 6}
          />
          <ColorButton
            color="red-700"
            text="Remove Row"
            action={removeRow}
            disabled={rows.length === 1}
          />
        </div>

        {/* Scoreboard grid */}
        <div className="w-full grid grid-cols-2 gap-8 pt-15 transition-all duration-600 ease-in-out">
          {/* Left Column */}
          <div className="flex flex-col gap-1">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-between items-center"
              >
                <div className={`${getPaddingByIndex("left", rowIndex)} pt-5`}>
                  {/* Left Image */}
                  <FadeImage
                    src={getImageSrc(row.left.species, row.left.state)}
                    alt={`Left Species ${rowIndex}`}
                    size={setDynamicSize(row.left.state)}
                  />
                </div>
                <div className="flex mr-15 rounded-full p-4 gap-4">
                  {/* Left Controls */}
                  <Dropdown
                    index={rowIndex}
                    options={speciesOptions}
                    onChange={(value) =>
                      handleRowChange(rowIndex, "left", "species", value)
                    }
                  />
                  <StateRadio
                    rowIndex={rowIndex}
                    side="left"
                    selectedState={row.left.state}
                    species={row.left.species}
                    onChange={(newState) =>
                      handleRowChange(rowIndex, "left", "state", newState)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-1">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-between items-center"
              >
                <div className="flex ml-15 rounded-full p-4 gap-4">
                  {/* Right Controls */}
                  <Dropdown
                    index={rowIndex}
                    options={speciesOptions}
                    onChange={(value) =>
                      handleRowChange(rowIndex, "right", "species", value)
                    }
                  />
                  <StateRadio
                    rowIndex={rowIndex}
                    side="left"
                    selectedState={row.left.state}
                    species={row.left.species}
                    onChange={(newState) =>
                      handleRowChange(rowIndex, "right", "state", newState)
                    }
                  />
                </div>
                <div className={`${getPaddingByIndex("right", rowIndex)} pt-5`}>
                  {/* Right Image */}
                  <FadeImage
                    src={getImageSrc(row.left.species, row.left.state)}
                    alt={`Left Species ${rowIndex}`}
                    size={setDynamicSize(row.left.state)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}