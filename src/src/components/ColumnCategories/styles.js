import React, { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const widthItem = (width - 10) / 2

export default StyleSheet.create({
  item: {
    width: widthItem,
    height: widthItem * 1.2,
    marginTop: 10,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 2,
    marginLeft: 10
  },
  content: {
    ...StyleSheet.absoluteFill,
  },
  wrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginLeft: 10
  },
  name: {
    color: "#fff",
    fontSize: 18
  },
  list: {
    paddingBottom: 10
  }
});
