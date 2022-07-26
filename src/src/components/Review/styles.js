/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Color, Constants } from "@common";

const { width, height } = Dimensions.get("window");
const vh = height / 100;

export default StyleSheet.create({
  wrapComment: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    flex: 1,
  },
  fullWidth: {
    width: width - 20,
    flexDirection: "row",
  },
  wrapRating: {
    margin: 10,
    flex: 1,
  },
  besideStar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusRate: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 8,
  },
  textStatusRate: {
    fontSize: 13,
    fontFamily: Constants.fontFamily,
  },
  rowHead: {
    margin: 10,
    marginLeft: 0,
  },
  headText: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 12,
    fontFamily: Constants.fontFamily,
  },
  headCommentText: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 12,
    color: "rgb(69,69,83)",
    fontSize: 24,
    fontFamily: Constants.fontFamily,
  },
  sendView: {
    marginTop: 8,
    backgroundColor: "#5DCDAD",
    width: width - 20,
    alignItems: "center",
    borderRadius: 3,
    overflow: "hidden",
  },
  sendButton: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginRight: 12,
    position: "absolute",
    marginLeft: width / 2 - 80,
    width: 100,
    top: 2,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  sendText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  inputCommentWrap: {
    borderColor: "#EBEBEB",
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 80,
    backgroundColor: "#fff",
  },
  inputCommentText: {
    margin: 10,
    height: vh * 20,
    fontSize: 15,
    color: Color.title,
  },
  wrapListComment: {
    marginTop: 10,
  },
  html: {
    marginLeft: 12,
    marginRight: 12,
  },
  itemComment: {
    flex: 1,
  },
  itemHeadComment: {
    flexDirection: "row",
  },
  avatarComment: {
    width: 40,
    height: 40,
  },
  authorName: {
    fontWeight: "400",
    fontSize: 14,
    marginTop: 2,
    marginLeft: 6,
    color: Color.title,
  },
  timeAgoText: {
    color: Color.time,
    fontSize: 12,
    marginLeft: 6,
    marginTop: 1,
  },
  commentHTML: {
    marginTop: -8,
    marginBottom: 8,
  },
});
