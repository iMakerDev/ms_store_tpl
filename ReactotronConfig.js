/** @format */

import Reactotron from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import { NativeModules } from "react-native";

const host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];

console.disableYellowBox = true;

Reactotron.configure({ name: "PoeticHouse", host });

// eslint-disable-next-line react-hooks/rules-of-hooks
Reactotron.useReactNative({
  asyncStorage: { ignore: ["secret"] },
});

Reactotron.use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
