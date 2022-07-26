/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";

import { ImageCache, TouchableScale } from "@components";
import { Styles } from "@common";

export default class BannerImage extends PureComponent {
  render() {
    const { viewAll, config } = this.props;
    const column = config.column || 1;
    const height = config.height || 200;
    const resizeMode = config.imageMode || "cover";

    return (
      <TouchableScale onPress={viewAll}>
        <View activeOpacity={1} style={styles.imageBannerView(column, height)}>
          <ImageCache
            uri={config.imageBanner}
            style={styles.imageBanner(resizeMode)}
          />
        </View>
      </TouchableScale>
    );
  }
}

const styles = {
  imageBannerView: (column, height) => ({
    width: Styles.width / column - 20,
    height,
    borderRadius: 9,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    overflow: "hidden",

    backgroundColor: "#eee",
  }),
  imageBanner: (resizeMode) => ({
    flex: 1,
    resizeMode,
  }),
};
