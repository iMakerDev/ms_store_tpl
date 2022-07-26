/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: (dark) => ({
    borderTopWidth: 10,
    borderColor: dark ? "#101425" : "#F5F5F5",
  }),
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
  mask:{
    flex:1,
    width:'100%',
    backgroundColor:"rgba(0,0,0,.2)",
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  imgContent:{
    width:'80%',
    backgroundColor:'#fff',
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:'space-around',
    padding:10
  },
  imgStyle:{
    height: width / 4,
    width: width / 4,
  }
});
