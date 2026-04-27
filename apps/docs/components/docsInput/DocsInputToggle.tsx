"use client"
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function DocsInputToggle ({label}: { label: string }) {
  const [state, setState] = useState(true);

  return (
    <div className="items-center justify-between mb-4 p-2 text-left">
      <span className="label-box">{label}</span>
      <button
        className={`relative w-14 h-7 mt-2 flex items-center rounded-full transition-colors duration-300 ease-in-out ${
          state ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => setState(prev => !prev)}
      >
        <AnimatePresence>
          {state ? (
            <motion.span
              key="check"
              className="absolute left-2 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Check size={14}/>
            </motion.span>
          ) : (
            <motion.span
              key="cross"
              className="absolute right-2 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <X size={14}/>
            </motion.span>
          )}
        </AnimatePresence>
        <div
          className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
            state ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}