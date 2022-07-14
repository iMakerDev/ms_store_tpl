/** @format */

import * as React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
|--------------------------------------------------
| Fixed safe area view on IphoneX, so just fix bottom screen
|--------------------------------------------------
*/

const SafeArea = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: Math.max(insets.bottom, 16),
        // backgroundColor: "white",
      }}>
      {children}
    </View>
  );
};

export default SafeArea;
