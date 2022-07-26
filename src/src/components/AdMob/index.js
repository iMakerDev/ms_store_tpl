/** @format */

import React, { useRef } from "react";
import { View } from "react-native";
// import { BannerAd, BannerAdSize, TestIds } from "@react-native-admob/admob";

import { Config } from "@common";
import styles from "./styles";

const Admob = ({ style }) => {
  const bannerRef = useRef(null);

  if (!Config.showAdmobAds) {
    return <View />;
  }

  return (
    <View style={[styles.body, style]}>
      {/* <BannerAd
        size={__DEV__ ? BannerAdSize.BANNER : Config.AdMob.deviceID}
        unitId={TestIds.BANNER}
        onAdFailedToLoad={(error) => console.error(error)}
        ref={bannerRef}
      /> */}
    </View>
  );
};

export default Admob;
