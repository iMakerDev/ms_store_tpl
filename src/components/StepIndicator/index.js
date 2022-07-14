/** @format */

import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./index_style.js";
import { Color, withTheme, Config } from "@common";

const widthScreen = Dimensions.get("window").width;

class StepIndicator extends Component {
  constructor(props) {
    super(props);
    const defaultStyles = {
      stepIndicatorSize: 30,
      borderPadding: 6,
      color: Color.checkout.stepActive,
    };

    this.customStyles = Object.assign(defaultStyles, props.customStyles);
    this.stepStrokeWidth = 50;
    this.imageMargin = this.customStyles.stepIndicatorSize / 2;

    const allIndicatorWidth =
      props.steps.length * this.customStyles.stepIndicatorSize +
      2 * props.steps.length * this.customStyles.borderPadding;
    this.marginContent =
      widthScreen -
      allIndicatorWidth -
      (props.steps.length - 1) * this.stepStrokeWidth;

    this.containerWidth = widthScreen;
    if (this.marginContent >= 50) {
      this.containerWidth = widthScreen - this.marginContent + 50;
      this.marginContent = 25;
    } else if (this.marginContent < 20) {
      (this.marginContent = 10),
        (this.stepStrokeWidth =
          (widthScreen - allIndicatorWidth - this.marginContent * 2) /
          (props.steps.length - 1));
    }

    if (Platform.OS === "ios") {
      this.labelWidth =
        this.marginContent * 2 +
        this.customStyles.stepIndicatorSize +
        2 * this.customStyles.borderPadding;
    } else {
      this.labelWidth = this.marginContent * 2;
    }
  }

  render() {
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    const content = [];
    const label = [];

    for (let i = 0; i < this.props.steps.length; i++) {
      const item = this.props.steps[i];
      content.push(this.renderStepIndicator(i, item.icon));
      label.push(
        <Text
          key={i}
          style={[
            styles.label,
            { color: text },
            { width: this.labelWidth },
            i <= this.props.currentIndex,
          ]}>
          {item.label}
        </Text>
      );
      if (i != this.props.steps.length - 1) {
        content.push(this.renderProgressBar(i));
      }
    }

    return (
      <View
        style={[
          styles.container,
          { width: this.containerWidth, backdropColor: background },
        ]}>
        <View style={styles.labelContainer}>{label}</View>
        <View style={styles.indicatorContainer}>{content}</View>
      </View>
    );
  }

  renderStepIndicator(index, icon) {
    const isCurrent = index === this.props.currentIndex;
    const {
      theme: {
        colors: { lineColor },
        dark: isDark,
      },
    } = this.props;

    const indicatorContainer = {
      width:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      height:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      borderWidth: 0.5,
      borderColor: isDark ? "#282D3F" : "#CED7DD",
      justifyContent: "center",
      alignItems: "center",
      borderRadius:
        (this.customStyles.stepIndicatorSize +
          this.customStyles.borderPadding * 2) /
        2,
    };

    const indicatorStyle = {
      backgroundColor:
        index < this.props.currentIndex
          ? this.customStyles.color
          : isDark
          ? "#282D3F"
          : "#CED7DD",
      width: this.customStyles.stepIndicatorSize,
      height: this.customStyles.stepIndicatorSize,
      borderRadius: this.customStyles.stepIndicatorSize / 1,
    };

    const indicatorCurrent = {
      backgroundColor: "white",
      borderWidth: 1.5,
      borderColor: this.customStyles.color,
    };

    const imageSize =
      isCurrent === false
        ? this.customStyles.stepIndicatorSize - this.imageMargin
        : this.customStyles.stepIndicatorSize - this.imageMargin - 3;
    const imageStyle = {
      width: imageSize,
      height: imageSize,
      position: "absolute",
      top: this.imageMargin / 2,
      left: this.imageMargin / 2,
      tintColor: isCurrent == false ? "white" : this.customStyles.color,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          index < this.props.currentIndex && this.props.onChangeTab(index)
        }
        style={[indicatorContainer, isDark && { borderColor: "#282D3F" }]}
        key={`indicator-${index}`}>
        <View
          style={[
            indicatorStyle,
            isCurrent && indicatorCurrent,
            isDark && { borderColor: lineColor },
          ]}>
          <Image resizeMode="contain" source={icon} style={imageStyle} />
        </View>
      </TouchableOpacity>
    );
  }

  renderProgressBar(index) {
    const {
      theme: { dark: isDark },
      openModal
    } = this.props;

    const progressBarContainer = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      justifyContent: "center",
      zIndex: 3,
    };

    const progressBarBorder = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth + 4,
      position: "absolute",
      top: 0,
      left: -2,
      right: -2,
      backgroundColor: isDark ? "#282D3F" : "#FFF",
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: isDark ? "#282D3F" : "#CED7DD",
    };

    const progressBar = {
      width: this.stepStrokeWidth + this.customStyles.borderPadding * 2 + 3,
      height: 2,
      backgroundColor: this.customStyles.color,
      position: "absolute",
      top: this.customStyles.borderPadding,
      left: -this.customStyles.borderPadding,
    };
    return (
      <View style={[progressBarContainer]} key={`progress-${index}`}>
        {openModal === false && <View style={progressBarBorder}>
          {index < this.props.currentIndex && <View style={progressBar} />}
        </View>}
      </View>
    );
  }
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0,
};

export default withTheme(StepIndicator);
