/** @format */

import { Easing, Animated } from "react-native";

export default {
  transitionSpec: {
    duration: 200,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: false,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;

    const height = layout.initHeight;
    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 0, 1],
    });

    return { opacity, transform: [{ translateY }] };
  },
};
