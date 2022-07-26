import { StyleSheet, PixelRatio } from "react-native";
import { Constants, Color } from "@common";
const kDefaultItemHeight = 60;
const kDefault1Px = 1.0 / PixelRatio.get();

const styles = StyleSheet.create({
    item: {
        height: kDefaultItemHeight,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flex1: {
        flex: 1,
    },
    container: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        margin: 0,
        borderRadius: 0,
        borderColor: '#00000000',
        borderWidth: kDefault1Px
    },
    dragHandle: {
        width: 70,
        height: 7,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignSelf: "center",
        marginTop: 4,
        position: "absolute"
    },
    defaultTextStyle: {
        color: '#000000',
        fontSize: 16,
        fontFamily: Constants.fontFamily
    },
    activeTextStyle: {
        color: '#5ECE7B',
        fontSize: 16,
        fontFamily: Constants.fontFamily
    },
    cancelTextStyle: {
        color: '#a3a5ac',
        fontSize: 18,
        fontFamily: Constants.fontFamily
    },
    destructiveTextStyle: {
        color: '#ff5e00',
        fontSize: 16,
        fontFamily: Constants.fontFamily
    },
    line: {
        height: kDefault1Px,
        backgroundColor: '#dddddd',
        margin: 0
    }
});

export default styles;