/** @format */

import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Languages, Constants, withTheme } from "@common";

@withTheme
class AttributesView extends React.PureComponent {
  render() {
    const {
      theme: {
        colors: { background, text, lineColor }
      },
    } = this.props;

    if (this.props.attributes && this.props.attributes.length > 0) {
      let attributes = [];
      for (let i = 0; i < this.props.attributes.length; i++) {
        attributes.push(
          <View
            key={i}
            style={[
              styles.row,
            ]}>
            <View style={[styles.lbContainer, { backgroundColor: lineColor }]}>
              <Text style={[styles.label, { color: text }]}>{this.props.attributes[i].name}</Text>
            </View>
            <View style={[styles.lbValue]}>
              <Text style={[styles.value, { color: text }]}>
                {this.props.attributes[i].options.toString()}
              </Text>
            </View>
          </View>
        );
      }
      return <View style={[styles.container, { backgroundColor: lineColor }]}>{attributes}</View>;
    } else {
      return (
        <View style={[styles.emptyAttributes, { backgroundColor: lineColor }]}>
          <Text>{Languages.EmptyProductAttribute}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  row: {
    flexDirection: "row",
    minHeight: 50,
  },
  lbContainer: {
    flex: 0.25,
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightColor: "#CED7DD",
    backgroundColor: "rgba(255,255,255,1)",
  },
  lbValue: {
    flex: 0.75,
    justifyContent: "center",
  },
  label: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    margin: 5,
    marginLeft: 10,
    color: "#5B5B5B",
    fontSize: 15,
    textAlign: 'left'
  },
  emptyAttributes: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255,255,255,1)",
  },
});

export default AttributesView;
