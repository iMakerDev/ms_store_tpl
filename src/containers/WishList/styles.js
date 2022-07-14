/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: "#CED7DD",
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 16,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
  value: {
    fontSize: 16,
    color: Color.headerTintColor,
    fontFamily: Constants.fontHeader,
    right: 20,
    position: "absolute",
    top: 60,
    ...Platform.select({
      android: {
        paddingTop: Config.showStatusBar ? 16 : 0,
      },
    }),
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  },
  button: {
    height: 40,
    width: width / 2,
    backgroundColor: "#4cb906",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  hiddenRow: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "#B7C4CB",
  },
  numberWrap: {
    position: "absolute",
    top: -18,
    right: -15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontHeader,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#758692",
    width: 230,
    marginTop: 10,
    lineHeight: 25,
    fontFamily: Constants.fontFamily,
  },

  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Constants.fontHeader,
  },
  bottomView: {
    flexDirection: "row",
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: "#d4dce1",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    marginLeft: 15,
    color: "#999",
  },
  money: {
    fontSize: 16,
    marginRight: 15,
    color: "#0f98ec",
  },
  scrollView: {
    paddingBottom: 100,
    height: height,
    paddingTop: 50,
  },
});
