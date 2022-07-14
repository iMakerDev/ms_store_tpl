import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
    coupon: {
        width: width / 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent:'center',
        marginBottom: 20
    },
    couponsContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        height: 60,
        // width: 200,
        backgroundColor: '#022a2c',
    },
    couponsSum: {
        fontSize: 25,
        color: "#fff",
        fontWeight: '900',
        marginRight: 5
    },
    couponsTip: {
        color: "#fff",
        fontWeight: "600"
    },
    codeText:{
        backgroundColor: "#ab283a" ,
        display:'flex',
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center"
    }
})
