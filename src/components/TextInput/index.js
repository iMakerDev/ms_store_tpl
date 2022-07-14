/** @format */

import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  return <StandardTextInput {...props} />;
};

const StandardTextInput = (props) => (
  <TextInput
    style={[styles.textinput, props.inputStyle]}
    placeholderTextColor="#C7C7C7"
    autoCorrect={false}
    underlineColorAndroid="transparent"
    {...props}
  />
);

const styles = StyleSheet.create({
  textinput: {
    height: 40,
    textAlign: "left",
    borderColor: "#d4dce1",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    backgroundColor: "#F6F7F9",
  },
  text: {
    color: "black",
    fontSize: 17,
  },
});

export default Input;
