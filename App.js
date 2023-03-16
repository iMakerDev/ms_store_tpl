/** @format */

import * as React from "react";
import { Component } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";

import { Config } from "@common";
import { getNotification } from "@app/Omni";
import store from "@store/configureStore";

import Router from "./src/Router";
import {Text} from "react-native"

enableScreens();

export default class ReduxWrapper extends Component {
  constructor(props) {
    super(props);

    // OneSignal.init(Config.OneSignal.appId);
  }

  async componentDidMount() {
    // const notification = await getNotification();

    if (notification) {
      // OneSignal.removeEventListener("opened", this.onOpened);
      // OneSignal.addEventListener("received", this.onReceived);
      // OneSignal.addEventListener("ids", this.onIds);
    }
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;

  }

  async componentWillUnmount() {
    // const notification = await getNotification();

    if (notification) {
      // OneSignal.removeEventListener("opened", this.onOpened);
      // OneSignal.removeEventListener("received", this.onReceived);
      // OneSignal.removeEventListener("ids", this.onIds);
    }
  }

  onReceived = (notification) => {
    // console.log("Notification received: ", notification);
  };

  onOpened = (openResult) => {
    // console.log("Message: ", openResult.notification.payload.body);
    // console.log("Data: ", openResult.notification.payload.additionalData);
    // console.log("isActive: ", openResult.notification.isAppInFocus);
    // console.log("openResult: ", openResult);
  };

  onIds = (device) => {
    console.log("Device info: ", device);
  };

  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
