/** @format */

import { StyleSheet, Dimensions } from "react-native";
import {Constants} from '@common'
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  flatlist: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  more: {
    width,
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  headerLabel: {
    color: "#333",
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    paddingTop: 30,
    marginLeft: 22,
  },
});
