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

        // width: 200,
        borderRadius:10,

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

        display:'flex',
        padding:10,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center"
    }
})
