/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

import { CustomPage } from "@containers";

class CustomPageScreen extends PureComponent {
  render() {
    const { route } = this.props;

    if (typeof route.params === "undefined") {
      return <View />;
    }

    if (typeof route.params.url !== "undefined") {
      return (
        <View style={{ flex: 1 }}>
          <WebView startInLoadingState source={{ uri: route.params.url }} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CustomPage id={route.params.id} />
      </View>
    );
  }
}

export default CustomPageScreen;
