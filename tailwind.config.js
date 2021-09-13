module.exports = {
  purge: [],
  mode: "jit",
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "mj-purple-gray-1": "#DFE3FA",
        "mj-purple-gray-2": "#888EB0",
        "mj-purple-gray-3": "#7E88C3",
        "mj-purple-gray-4": "#0C0E16",
        "mj-purple-gray-5": "#373B53",
        "mj-purple-1": "#7C5DFA",
        "mj-purple-2": "#9277FF",
        "mj-purple-3": "#1E2139",
        "mj-purple-4": "#252945",
        "mj-red-1": "#FF9797",
        "mj-red-2": "#EC5757",
        "mj-lt-gray": "#F8F8FB",
        "mj-dk-gray": "#141625",
        "mj-orange": "#FF8F00",
        "mj-green": "#33D69F"
      }
    },
    fontFamily: {
      sans: ["Spartan", "ui-sans-serif", "sans-serif", "system-ui"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Spartan", "ui-sans-serif", "sans-serif", "system-ui"],
      body: ["Spartan", "ui-sans-serif", "sans-serif", "system-ui"]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
};
