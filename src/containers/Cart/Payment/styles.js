/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Color, Constants } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "white",
    flexWrap: "wrap",
  },
  paymentOption: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionContainer: {
    width: width / 2 - 10,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  btnOption: {
    width: 80,
    height: 60,
  },
  selectedBtnOption: {
    width: width / 2 - 30,
    height: width / 3 - 40,
    backgroundColor: "rgba(206, 215, 221, 0.6)",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
  },
  imgOption: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  message: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    padding: 30,
    marginTop: 0,
    paddingTop: 30,
    fontFamily: Constants.fontFamily,
  },
  formCard: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  btnNextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnNext: {
    marginBottom: 20,
    backgroundColor: "#0091ea",
    height: 40,
    width: 200,
    borderRadius: 20,
  },
  btnNextText: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
    paddingLeft: 15,
  },
  descriptionView: {
    marginTop: 20,
  },
});
