/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {ScrollableTabView} from "react-native-scrollable-tab-view";

import ProductDetail from "./ProductDetail";

class Detail extends Component {
  componentDidMount() {
    this.props.fetchProductRelated(this.props.product.related_ids);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.product.id != nextProps.product.id ||
      this.props.productRelated.length != nextProps.productRelated.length
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.product.id != nextProps.product.id) {
      this.props.fetchProductRelated(nextProps.product.related_ids);
      this.tabView.goToPage(0);
    }
  }

  render() {
    const { onViewCart, product, productRelated, navigation } = this.props;

    return (
      <ScrollableTabView
        ref={(tabView) => {
          this.tabView = tabView;
        }}
        style={{ backgroundColor: "#ccc" }}
        tabBarPosition="overlayTop"
        prerenderingSiblingsNumber={1}
        renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}>
        <ProductDetail
          key="pm"
          product={product}
          navigation={navigation}
          onViewCart={onViewCart}
        />

        {productRelated.map((item, index) => (
          <ProductDetail
            key={`p${index}`}
            product={item}
            navigation={navigation}
            onViewCart={onViewCart}
          />
        ))}
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    productRelated: products.productRelated,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const ProductRedux = require("@redux/ProductRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProductRelated: (product) => {
      ProductRedux.actions.fetchProductRelated(dispatch, product);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Detail);
