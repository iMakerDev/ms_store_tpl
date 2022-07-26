/**
 * @format
 * @providesModule ParallaxMixin
 */

"use strict";

import { Animated } from "react-native";

var ParallaxMixin = {
  UNSAFE_componentWillMount: function() {
    var scrollY = new Animated.Value(0);
    this.setState({
      parallaxScrollY: scrollY,
    });
    this.onParallaxScroll = Animated.event([
      { nativeEvent: { contentOffset: { y: scrollY } } },
    ]);
  },
};

module.exports = ParallaxMixin;
