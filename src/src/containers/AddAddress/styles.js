/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer:{
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10
  },
  btnAdd:{
    height: 45,
    width: 150,
    backgroundColor: Color.primary,
    alignItems:'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20
  },
  add:{
    color: '#fff'
  }
});
