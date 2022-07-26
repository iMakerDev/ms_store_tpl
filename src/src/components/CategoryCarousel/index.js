/** @format */

import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import { toast, warn } from "@app/Omni";
import { Color, Constants, Tools, Languages, Images, Config } from "@common";
import styles from "./styles";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "@expo";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const slideHeight = viewportHeight * 0.65;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const slideInnerContainer = {
  width: itemWidth,
  height: slideHeight,
  borderRadius: 6,
  overflow: "hidden",
  paddingHorizontal: itemHorizontalMargin,
  paddingBottom: 18, // needed for shadow
};

class CategoryCarousel extends Component {

  showCategory = (category) => {
    const { setSelectedCategory, onViewCategory } = this.props;
    setSelectedCategory({
      ...category,
      mainCategory: category,
    });
    onViewCategory({ mainCategory: category });
  };

  renderItem = ({ item, index }) => {
    if (item.image == null) return <View />;

    const image =
      item.image !== null
        ? { uri: item.image.src }
        : Images.categoryPlaceholder;

    // warn(item.image.src);

    return (
      <View style={slideInnerContainer}>
        <LinearGradient
          style={[styles.linearGradient, { width: itemWidth }]}
          colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.8)"]}
        />
        <Image source={image} style={styles.image} />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.showCategory(item)}
          style={styles.titleView}>
          <Text style={styles.title}>
            {Tools.getDescription(item.name, 200)}
          </Text>
          <Text numberOfLines={2} style={styles.count}>
            {item.count + " " + Languages.products}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { categories } = this.props;

    return (
      <Carousel
        layout={"stack"}
        layoutCardOffset={18}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideOpacity={0.4}
        contentContainerCustomStyle={styles.sliderContainer}
        removeClippedSubviews={false}
        loop={true}
        data={categories}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    netInfo: state.netInfo,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CategoryRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    setActiveLayout: (value) => dispatch(actions.setActiveLayout(value)),
    setSelectedCategory: (category) =>
      dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(CategoryCarousel);
