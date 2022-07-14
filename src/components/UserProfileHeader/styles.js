/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles } from "@common";

export default StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  fullName: {
    fontWeight: "600",
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: 30,
    marginBottom: 6,
  },
  address: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#9B9B9B",
    fontWeight: "600",
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    //backgroundColor: "#FFF",
    padding: 20,
  },
  avatar: {
    height: width / 4,
    width: width / 4,
    borderRadius: 4,
  },
  loginText: {
    color: "#666",
  },
  line:{
    display:'flex'
  },
  img:{
    display:"flex"
  }
});
