/** @format */

import { Dimensions, StyleSheet, I18nManager } from "react-native";
import { Color, Styles } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Color.background,
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 1,
  },
  logo: {
    width: Styles.width * 0.8,
    height: (Styles.width * 0.8) / 2,
  },
  subContain: {
    paddingHorizontal: Styles.width * 0.1,
    paddingBottom: 50,
  },
  loginForm: {},
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.blackDivide,
    borderBottomWidth: 1,
  },
  input: (text) => ({
    color: text,
    borderColor: "#9B9B9B",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
  }),
  loginButton: {
    marginTop: 20,
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
  },
  separatorWrap: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: (text) => ({
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: text,
  }),
  separatorText: (text) => ({
    color: text,
    paddingHorizontal: 10,
  }),
  fbButton: {
    backgroundColor: Color.login.facebook,
    borderRadius: 5,
    elevation: 1,
  },
  smsButton: {
    marginVertical: 10,
    backgroundColor: Color.login.sms,
    borderRadius: 5,
    elevation: 1,
  },
  appleBtn: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 44,
  },
  // ggButton: {
  //     marginVertical: 10,
  //     backgroundColor: Color.google,
  //     borderRadius: 5,
  // },
  signUp: {
    color: Color.blackTextSecondary,
    marginTop: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: Color.primary,
  },
  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  containerSMS: {

    backgroundColor: "#ffffff",
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 150,
    // justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  formInputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#adb4bc",
    borderRadius: 20,
    height: 50,
    width: "90%",
  },
  formInput: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#5a52a5",
  },
  btnSendSMS: {
    width: "90%",
    height: 50,
    borderColor: Color.primary,
    backgroundColor: Color.primary,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 22,
  },
  formInputConfirmContainer: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    width: "90%",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#adb4bc",
  },
  textBtn: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  formInputConfirm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: width * 0.25,
  },
  formText: {
    flex: 0.25,
    flexDirection: "row",
    paddingHorizontal: 22,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialCode: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5a52a5",
  },
});
