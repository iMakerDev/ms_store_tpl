/**
 * @format
 * @providesModule ParallaxImage
 */

"use strict";

import { isEqual } from "lodash";
import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

var WINDOW_HEIGHT = Dimensions.get("window").height;

export default class ParallaxImage extends Component {
  static defaultProps = {
    parallaxFactor: 0.2,
  };

  isLayoutStale = true;
  state = {
    offset: 0,
    height: 0,
    width: 0,
  };

  setNativeProps = (nativeProps) => {
    this._container.setNativeProps(nativeProps);
  };

  // Measure again since onLayout event won't pass the offset
  handleLayout = (event) => {
    if (this.isLayoutStale) {
      (this._touchable || this._container).measure(this.handleMeasure);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (!isEqual(nextProps, this.props)) {
      this.isLayoutStale = true;
    }
  };

  handleMeasure = (ox, oy, width, height, px, py) => {
    this.isLayoutStale = false;
    this.setState({
      offset: py,
      height,
      width,
    });
  };

  render = () => {
    var { offset, width, height } = this.state;
    var {
      onPress,
      scrollY,
      parallaxFactor,
      style,
      imageStyle,
      overlayStyle,
      children,
      ...props
    } = this.props;
    var parallaxPadding = height * parallaxFactor;

    var parallaxStyle = {
      height: height + parallaxPadding * 2,
      width: width,
    };
    if (scrollY) {
      parallaxStyle.transform = [
        {
          translateY: scrollY.interpolate({
            inputRange: [offset - height, offset + WINDOW_HEIGHT + height],
            outputRange: [-parallaxPadding, parallaxPadding],
            extrapolate: "clamp",
          }),
        },
      ];
    } else {
      parallaxStyle.transform = [{ translateY: -parallaxPadding }];
    }
    var content = (
      <Animated.View
        ref={(component) => (this._container = component)}
        style={[style, styles.container]}
        onLayout={this.handleLayout}>
        <Animated.Image
          {...props}
          style={[imageStyle, parallaxStyle]}
          pointerEvents="none"
        />
        <View style={[styles.overlay, overlayStyle]}>{children}</View>
      </Animated.View>
    );
    // Since we can't allow nested Parallax.Images, we supply this shorthand to wrap a touchable
    // around the element
    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={this.props.containerStyle}
          ref={(component) => (this._touchable = component)}
          onPress={onPress}>
          {content}
        </TouchableOpacity>
      );
    }
    return content;
  };
}

var styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = ParallaxImage;
