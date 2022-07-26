/** @format */

import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safeAreaView:{
    flex:1,
  },
  scrollView:{
    flexGrow:1,
  },
  container: {
    marginBottom: 2,
  },
  fullName: {
    fontWeight: "600",
    backgroundColor: "transparent",
    fontSize: 30,
    marginBottom: 6,
  },
  address: {
    backgroundColor: "transparent",
    fontSize: 15,
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
  },
  couponsContent:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginTop: 20,
    flexWrap:"wrap"
  },
  coupon:{
    width:width/2,
    display:"flex",
    alignItems:"center",
    marginBottom:20
  },
  couponsContainer:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    height:60,
    width:170,
    backgroundColor:'#022a2c',
  },
  couponsSum:{
    fontSize:25,
    color:"#fff",
    fontWeight:'900',
    marginRight:5
  },
  couponsTip:{
    color:"#fff",
    fontWeight:"600"
  },
  mask:{
    flex:1,
    width:'100%',
    backgroundColor:"rgba(0,0,0,.2)",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  tipContainer:{
    width:'80%',
    backgroundColor:'#fff',
    display:"flex",
    justifyContent:'center',
    alignItems:"center",
    padding:10,
    borderRadius:10
  },
  buttons:{
    width:'100%',
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:30
  },
  button:{
    width:80,
    height:40,
    lineHeight:40,
    textAlign:"center",
    borderRadius:5
  },
  buttonTxet:{
    textAlign:"center",
    lineHeight:40
  },  
  tipText:{
    color:"#000",
    fontSize:16,
    marginBottom:10,
  },
});
