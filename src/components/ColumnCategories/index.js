/** @format */

import React, { PureComponent } from "react";
import { View, FlatList, Image, Text } from "react-native";
import { connect } from "react-redux";

import { toast, warn } from "@app/Omni";
import { Languages, Images, withTheme } from "@common";
import styles from "./styles";
import { ImageCache, TouchableScale } from '@components'

class Categories extends PureComponent {

  render() {

    const {
      categories,
      theme: {
        colors: {
          background
        }
      }
    } = this.props;

    // filter only the parent categories
    const cates = categories.filter(cate => cate.parent == 0);

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cates}
        renderItem={this.renderItem}
        numColumns={2}
        contentContainerStyle={[styles.list, { backgroundColor: background }]}
      />
    );
  }

  renderItem = ({ item }) => {
    return (
      <TouchableScale activeOpacity={0.9} style={styles.item} onPress={() => this.props.onViewCategory(item)}>
        {item.image && <ImageCache uri={item.image.src} style={styles.image} />}
        {!item.image && <Image source={Images.categoryPlaceholder} style={styles.image} />}
        <View style={styles.content}>
          <View style={styles.wrap}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </View>
      </TouchableScale>
    )
  }

  componentDidMount() {
    if (this.props.categories.length == 0) {
      this.props.fetchCategories();
    }
  }
}

Categories.defaultProps = {
  categories: [],
};

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
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(Categories));
