/** @format */

// noinspection JSUnresolvedVariable
import React from "react";
import PropTypes from "prop-types";
import { View, Animated, Image, StyleSheet } from "react-native";

import { Config, withTheme } from "@common";

@withTheme
class LogoSpinner extends React.Component {
  constructor(props) {
    super(props);

    this.animateValue = new Animated.Value(0);
    this.animatedStyle = {
      transform: [
        {
          rotate: this.animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
          }),
        },
      ],
    };

    this.doAnimation = this.doAnimation.bind(this);
  }

  componentDidMount() {
    this.doAnimation();
  }

  doAnimation() {
    this.animateValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animateValue, {
        toValue: 6,
        duration: 3000,
        friction: 0.5,
        useNativeDriver: true,
      }),
    ]).start(() => this.doAnimation());
  }

  render() {
    const { fullStretch, style, logo } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <View
        style={[
          fullStretch ? styles.container_full_stretch : styles.container,
          style,
          { backgroundColor: background },
        ]}>
        <Animated.View style={this.animatedStyle}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: null,
    width: null,
  },
  container_full_stretch: {
    height: null,
    width: null,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
});

LogoSpinner.propTypes = {
  logo: PropTypes.any,
  fullStretch: PropTypes.bool,
};

// noinspection JSUnusedGlobalSymbols
LogoSpinner.defaultProps = {
  logo: Config.LogoLoading,
  fullStretch: false,
};

export default LogoSpinner;
