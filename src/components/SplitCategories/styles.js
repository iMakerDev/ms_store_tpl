import React, { StyleSheet, Dimensions } from "react-native";
import { Color, Constants, Styles } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    backgroundColor: "white"
  },
  content:{
    flex: 1
  },
  list:{
    paddingTop: 12
  },
  loading:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
});
