/** @format */

import { StyleSheet, Dimensions } from "react-native";
var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "white",
  },
  name: {
    fontSize: 17,
    margin: 10,
    color: "#2e97e5",
    textAlign: 'left'
  },
  review: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: "gray",
    textAlign: 'left'
  },
  date_created: {
    margin: 10,
    fontSize: 15,
    color: "#b2b2b2",
  },
  rating: {
    margin: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CED7DD",
  },
});
