import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "@common";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    flatlist: {
        flexDirection: "row",
        height: height * 0.42
    },
    card: {
        flex: 1,
        width: width,
        height: height * 0.36
    },
    title: {
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 10,
        fontSize: 20
    },
    imagePanelOne: {
        marginTop: 8,
        marginLeft: 12,
        alignItems: "center",
        justifyContent: "center",
        // resizeMode: 'cover',
        position: "relative",
        borderRadius: 3,
        width: width - 24,
        height: width / 2 + 50,
    },
    labelStyle: {
        marginTop: 5,
        padding: 15,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#333'
    },
    btnShop: {
        width: 150,
        height: 40,
        backgroundColor: "#f39c12",
        borderRadius: 5,
    },
    btnShopText: {
        fontSize: 16,
    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        marginTop: 18,
    },
    headerLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 15,
    },
    headerRight: {
        flex: 1 / 3,
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 0,
        flexDirection: "row",
    },
    headerRightText: {
        fontSize: 11,
        marginRight: 0,
        marginTop: 0,
        color: "#666",
        fontFamily: Constants.fontFamily,
    },
    icon: {
        marginRight: 8,
        marginTop: 2,
        backgroundColor: "transparent",
    },
    tagHeader: {
        fontSize: 18,
        color: "#666",
        letterSpacing: 2,
        fontFamily: Constants.fontHeader,
    },
})

export default styles;