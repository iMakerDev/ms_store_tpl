/** @format */
import { DefaultTheme, DarkTheme } from "react-native-paper";

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "rgba(255, 255, 255, 0.9)",
    primary: "#1CB5B4",
    accent: "yellow",
    lineColor: "#383A46",
    background: "#222229", // '#242424' // '#232D4C'
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1CB5B4",
    lineColor: "#f9f9f9",
    background: "#ffffff",
    accent: "yellow",
  },
};

export default { dark, light };
