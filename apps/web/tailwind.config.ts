const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}", // 👈 THIS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
