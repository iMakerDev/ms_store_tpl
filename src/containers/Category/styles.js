import { StyleSheet } from "react-native";
import { Color, Styles, Constants } from "@common";

const styles = StyleSheet.create({
    //main
    listView: {
      alignItems: "flex-start",
      paddingBottom: Styles.navBarHeight + 10,
    },
    container: {
      flexGrow: 1,
      backgroundColor: Color.background,
    },

    //ProductRows
    container_product: {
        backgroundColor: "white",
        paddingBottom: 10,
        marginHorizontal: Styles.width / 20,
        marginTop: 10,
      },
      container_list: {
        width: Styles.width * 0.9,
        marginLeft: Styles.width * 0.05,
        marginRight: Styles.width * 0.05,
        marginTop: Styles.width * 0.05,
      },
      container_grid: {
        width: (Styles.width * 0.9) / 2,
        marginLeft: (Styles.width * 0.1) / 3,
        marginRight: 0,
        marginTop: (Styles.width * 0.1) / 3,
      },
      image: {
        marginBottom: 8,
      },
      image_list: {
        width: Styles.width * 0.9 - 2,
        height: Styles.width * 0.9 * Styles.thumbnailRatio,
      },
      image_grid: {
        width: Styles.width * 0.45 - 2,
        height: Styles.width * 0.45 * Styles.thumbnailRatio,
      },
      text_list: {
        color: Color.black,
        fontSize: Styles.FontSize.medium,
        fontFamily: Constants.fontFamily,
      },
      text_grid: {
        color: Color.black,
        fontSize: Styles.FontSize.small,
        fontFamily: Constants.fontFamily,
      },
      textRating: {
        fontSize: Styles.FontSize.small,
      },
      price_wrapper: {
        ...Styles.Common.Row,
        top: 0,
      },
      cardWraper: {
        flexDirection: "column",
      },
      sale_price: {
        textDecorationLine: "line-through",
        color: Color.blackTextDisable,
        marginLeft: 0,
        marginRight: 0,
        fontSize: Styles.FontSize.small,
      },
      cardPriceSale: {
        fontSize: 15,
        marginTop: 2,
        fontFamily: Constants.fontFamily,
      },
      price: {
        color: Color.black,
        fontSize: Styles.FontSize.medium,
      },
      saleWrap: {
        zIndex: 1000,
        position: 'absolute',
        right: 2,
        bottom: 20,
        borderRadius: 5,
        backgroundColor: Color.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
        // marginLeft: 5,
      },
      sale_off: {
        color: Color.lightTextPrimary,
        fontSize: Styles.FontSize.small,
      },
      cardText: {
        fontSize: 20,
        textAlign: "center",
      },
      cardPrice: {
        fontSize: 18,
        marginBottom: 8,
        fontFamily: Constants.fontFamily,
      },
      btnWishList: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
      },
  });

export default styles;