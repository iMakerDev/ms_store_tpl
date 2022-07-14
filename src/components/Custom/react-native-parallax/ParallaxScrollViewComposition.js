/**
 * @format
 * @providesModule ParallaxComposition
 */

"use strict";

import { isArray } from "lodash";
import React, { Component } from "react";
import { Animated, ScrollView } from "react-native";

import ParallaxImage from "./ParallaxImage";

var applyPropsToParallaxImages = function(children, props) {
  if (isArray(children)) {
    return children.map((child) => {
      if (isArray(child)) {
        return applyPropsToParallaxImages(child, props);
      }
      if (child.type === ParallaxImage) {
        return React.cloneElement(child, props);
      }
      return child;
    });
  }
  if (children.type === ParallaxImage) {
    return React.cloneElement(children, props);
  }
  return children;
};

export default class ParallaxScrollViewComposition extends Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };

  getScrollResponder = () => {
    return this._scrollComponent.getScrollResponder();
  };

  UNSAFE_componentWillMount = () => {
    var scrollY = new Animated.Value(0);
    this.setState({ scrollY });
    this.onParallaxScroll = Animated.event([
      { nativeEvent: { contentOffset: { y: scrollY } } },
    ]);
  };

  render = () => {
    var { ref, children, scrollViewComponent, onScroll, ...props } = this.props;
    var { scrollY } = this.state;
    var ScrollComponent = scrollViewComponent || ScrollView;
    var handleScroll = onScroll
      ? (event) => {
          this.onParallaxScroll(event);
          onScroll(event);
        }
      : this.onParallaxScroll;
    children = children && applyPropsToParallaxImages(children, { scrollY });
    return (
      <ScrollComponent
        ref={(component) => {
          this._root = component;
          if (typeof ref === "function") {
            ref(component);
          }
        }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        {...props}>
        {children}
      </ScrollComponent>
    );
  };
}

module.exports = ParallaxScrollViewComposition;
