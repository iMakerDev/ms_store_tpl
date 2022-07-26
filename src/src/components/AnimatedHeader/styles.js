/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
import { Device, Config, Constants } from "@common";

const isAndroid = Platform.OS === "android";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  headerLabel: {
    color: "#333",
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 22,
    position: "absolute",
    ...Platform.select({
      ios: {
        top: 60,
      },
      android: {
        top: 50,
      },
    }),
  },
  headerAndroid: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        height: Config.showStatusBar ? 72 : 50,
      },
      android: {
        height: 48,
      },
    }),
    // backgroundColor: "#fff",
  },
  headerLabelStatic: {
    color: "#333",
    fontSize: 20,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 55,
    
    fontWeight: "bold",

    ...Platform.select({
      ios: {
        marginTop: 12,
        paddingTop: Config.showStatusBar ? 23 : 2,
      },
      android: {
        marginTop: 18, 
      },
    }),
  },

  headerView: {
    width,
    ...Platform.select({
      ios: {
        height: 60,
      },
      android: {
        height: Config.showStatusBar ? 70 : 50,
      },
    }),
  },
  flatlist: {
    paddingTop: 40,
  },
  homeMenu: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: Device.isIphoneX ? 33 : 26,
      },
      android: {
        top: 14
      },
    }),
    zIndex: 9,
  },
});
