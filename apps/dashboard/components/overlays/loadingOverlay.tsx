import { AnimatePresence, motion } from "framer-motion";

type LoadingOverlayProps = {
  text: string;
  disabled: boolean;
}

export default function LoadingOverlay({text, disabled}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-999"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] cursor-wait"/>

          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-gray-900/90 border border-gray-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              {text}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}