/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Color, Icons, Styles } from "@common";
import { Icon } from "@app/Omni";

class Rating extends PureComponent {
  render() {
    const { rating, size, color, style } = this.props;
    const formatRating = Number(rating);
    const stars = [];
    for (let i = 1; i < 6; i++) {
      stars[i - 1] = (
        <Icon
          key={i}
          name={Icons.MaterialCommunityIcons.Star}
          size={size}
          color={formatRating >= i ? color : Color.blackDivide}
        />
      );
    }

    return formatRating > 0 ? (
      <View style={[styles.container, style]}>{stars}</View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

Rating.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  rating: PropTypes.any,
};

// noinspection JSUnusedGlobalSymbols
Rating.defaultProps = {
  size: Styles.IconSize.SmallRating,
  color: Color.accent,
  rating: 5,
};

export default Rating;
