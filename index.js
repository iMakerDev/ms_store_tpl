/** @format */

import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import Config from './package.json';
// ignore specific yellowbox warnings
LogBox.ignoreLogs([
  "Warning: isMounted(...) is deprecated", // works
  "Module RCTImageLoader", // works
  "Require cycle:", // doesn't work
  "ListItem",
  "Failed prop type",
  "It appears that you are using old version of react-navigation library",
  "Warning: `flexWrap: `wrap``",
  "Deprecation in 'navigationOptions'",
  "Require cycles",
  "console.disableYellowBox",
]);

AppRegistry.registerComponent(Config.name, () => App);
