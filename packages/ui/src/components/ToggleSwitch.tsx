import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToggleSwitchProps {
  label?: string;
  description?: string;
  state: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export function ToggleSwitch ({ label = "", description = "", state, disabled = false, onChange, className }: ToggleSwitchProps) {
  return (
    <div className={`items-center justify-between ${className}`}>
      <div className="flex flex-col">
        <label className="text-white text-base md:text-lg font-bold mb-2">
          {label}
        </label>
        <span className="text-white text-sm md:text-base mb-2">
          {description}
        </span>
      </div>
      <button
        className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 ease-in-out ${
          disabled 
            ? "bg-gray-700 cursor-not-allowed"
            : `${
              state 
                ? "bg-blue-500"
                : "bg-gray-500"
            }`
        }`}
        onClick={() => onChange(!state)}
        disabled={disabled}
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
            state 
              ? "translate-x-7"
              : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}