/** @format */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {},
  productView: {},
  imageProduct: {
    flex: 1,
    width: null,
    height: null,
    marginBottom: 20,
  },
  name: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 25,
    color: "black",
    textAlign: "center",
  },
  price: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  indicatorView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cccccc",
    margin: 3,
  },
  currentIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btnShop: {
    width: 150,
    height: 40,
    backgroundColor: "#f39c12",
    borderRadius: 5,
  },
  btnShopText: {
    color: "white",
    fontSize: 16,
  },
});
