/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import Color from "@common/Color";
import styles from "./styles";

const Spinkit = ({ css }) => (
  <View style={[styles.spinner, typeof css !== "undefined" ? css : null]}>
    <ActivityIndicator color={Color.spin} />
  </View>
);

Spinkit.propTypes = {
  css: PropTypes.any,
};

export default Spinkit;
