import { join } from "path";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    
    join(__dirname, "../../packages/ui/**/*.{ts,tsx}"),
    join(__dirname, "../../packages/lib/**/*.{ts,tsx}"),
    join(__dirname, "../../packages/types/**/*.{ts,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
