/** @format */

import { StyleSheet, Dimensions, I18nManager } from "react-native";
import { Constants, Styles } from "@common";
import { Color } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(247, 247, 249, 1)",
  },
  naviBar: {
    height: 64,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  naviTitle: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    zIndex: 2,
    position: "absolute",
    top: 20,
    left: 10,
  },
  btnBackImage: {
    height: 30,
    width: 30,
  },
  listContainer: {
    flex: 1,
  },
  productInfo: {
    alignItems: "center",
    backgroundColor: "#f6f6f8",
  },
  imageSlider: {
    flex: 1,
    marginTop: 0,
  },
  imageProduct: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 15,
    marginBottom: 10,
    resizeMode: "contain",
    width: Constants.Window.width,
    height: height * 0.5,
  },
  imageProductFull: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 3,
    resizeMode: "cover",
    height,
  },
  productSizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 15,
  },
  productSize: {
    marginLeft: 5,
    marginRight: 5,
  },
  productName: {
    textAlign: "center",
    fontSize: 20,
    color: Color.Text,
    padding: 8,
    marginTop: 4,
    fontFamily: Constants.fontHeader,
  },
  productPrice: {
    fontSize: 18,
    color: Color.blackTextSecondary,
    fontFamily: Constants.fontFamily,
  },
  sale_price: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 5,
    marginTop: 4,
    fontFamily: Constants.fontFamily,
  },
  tabButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(255,255,255,1)",
  },
  textTab: {
    fontFamily: Constants.fontHeader,
    color: "rgba(183, 196, 203, 1)",
    fontSize: 16,
  },
  tabButtonHead: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    opacity: 0,
  },
  tabItem: {
    flex: 0.32,
    backgroundColor: "rgba(255,255,255,1)",
  },
  bottomView: {
    height: 50,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
  },
  buttonContainer: {
    flex: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  imageButton: {
    width: 20,
    height: 20,
    tintColor: "#ccc",
    opacity: 0.6,
    flex: 1,
  },
  buttonStyle: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBuy: {
    flex: 0.5,
    backgroundColor: Color.product.BuyNowButton,
  },
  outOfStock: {
    backgroundColor: Color.product.OutOfStockButton,
  },
  btnBuyText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: Constants.fontHeader,
  },
  description: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  productColorContainer: {
    position: "absolute",
    top: 50,
    left: I18nManager.isRTL ? width - 50 : 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: 50,
  },

  modalBoxWrap: {
    position: "absolute",
    borderRadius: 2,
    width,
    height,
    zIndex: 9999,
  },
  iconZoom: {
    position: "absolute",
    right: 0,
    top: 10,
    backgroundColor: "rgba(255,255,255,.9)",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: "#666",
    fontWeight: "600",
    fontSize: 10,
    margin: 4,
    zIndex: 9999,
  },
  image: {
    width,
    height: height - 40,
    zIndex: 9999,
  },
  dotActive: {
    backgroundColor: "rgba(183, 196, 203, 1)",
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: "rgba(183, 196, 203, 1)",
  },
  tabView: {
    minHeight: height / 2,
    marginTop: 10,
  },
  price_wrapper: (backgroundColor) => ({
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor,
  }),

  textRating: {
    fontSize: 12,
    marginLeft: 4,
    paddingTop: 4,
  },

  attributeName: {
    color: "#aaa",
    fontFamily: Constants.fontFamily,
    fontSize: 11,
  },
  dropdownStyle: {
    flexDirection: "row", 
    height: 40, 
    width: width * 0.85, 
    borderColor: "#F1F2F3", 
    borderWidth: 2,
  },
  dropdownLeftStyle: {
    flex: 0.2, 
    justifyContent: "center", 
    paddingLeft: 5
  },
  dropdownRightStyle: {
    flex: 0.8, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  dropdownRightTitleStyle: {
    flex: 0.9, 
    alignItems: 'flex-end', 
    paddingRight: 10
  },
  dropdownRightIconStyle: {
    flex: 0.1, 
    alignItems: "center"
  },
  dropdownTextStyle: {
    fontSize: 14, 
    lineHeight: 16, 
    fontWeight: "bold"
  },
  iconStyle: {
    width: 18,
    height: 18,
    opacity: 0.3
  }
});
