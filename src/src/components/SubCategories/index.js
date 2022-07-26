/** @format */

import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { toast, getProductImage } from "@app/Omni";
import { Tools, Languages, Images, Styles, withTheme } from "@common";
import styles from "./styles";
import Categories from "./Categories";
import ProductItem from "../HorizonLayout/TwoColumn";

class SubCategories extends Component {
  state = {
    selectedIndex: 0,
  };

  render() {
    const {
      products,
      isFetching,
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Categories
          selectedIndex={this.state.selectedIndex}
          onPress={this.selectCategory}
        />
        <View style={styles.content}>
          {isFetching && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!isFetching && (
            <FlatList
              contentContainerStyle={styles.list}
              data={products}
              numColumns={2}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => {
    const { onViewPost } = this.props;
    const title = Tools.getDescription(item.name);

    const imageURL =
      item.images.length > 0
        ? getProductImage(item.images[0].src, Styles.width)
        : Images.PlaceHolderURL;

    const props = {
      imageURL,
      title,
      product: item,
    };
    return <ProductItem {...props} viewPost={() => onViewPost(item)} />;
  };

  selectCategory = (index) => {
    this.setState({ selectedIndex: index });
    const { categories, fetchProductsByCategoryId, clearProducts } = this.props;

    clearProducts();
    fetchProductsByCategoryId(categories[index].id, 1);
  };

  componentDidMount() {
    const { categories, fetchProductsByCategoryId, clearProducts } = this.props;
    clearProducts();
    if (categories.length > 0) {
      fetchProductsByCategoryId(categories[0].id, 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories.length == 0 && nextProps.categories.length > 0) {
      this.props.fetchProductsByCategoryId(nextProps.categories[0].id, 1);
    }
  }
}

SubCategories.defaultProps = {
  categories: [],
  products: [],
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    netInfo: state.netInfo,
    products: state.products.list,
    isFetching: state.products.isFetching,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CategoryRedux");
  const {
    fetchProductsByCategoryId,
    clearProducts,
  } = require("@redux/ProductRedux").actions;
  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    fetchProductsByCategoryId: (categoryId, page, per_page = 20) => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      fetchProductsByCategoryId(dispatch, categoryId, per_page, page);
    },
    clearProducts: () => dispatch(clearProducts()),
    setSelectedCategory: (category) =>
      dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(SubCategories));
