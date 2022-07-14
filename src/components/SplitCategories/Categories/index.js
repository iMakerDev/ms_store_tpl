/** @format */

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";

import { toast, warn } from "@app/Omni";
import { Languages } from "@common";
import styles from "./styles";
import Item from "./Item";

class Categories extends Component {
  render() {
    const { categories, selectedIndex, onPress } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <Item
              item={item}
              key={index}
              selected={index == selectedIndex}
              onPress={() => onPress(index)}
            />
          ))}
        </ScrollView>
      </View>
    );
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
)(Categories);
