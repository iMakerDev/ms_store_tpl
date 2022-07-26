/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { size } from "lodash";

import { Constants, Languages, withTheme } from "@common";
import { PostLayout } from "@components";
import styles from "./styles";

class ProductRelated extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tags: PropTypes.any,
    fetchProductRelated: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    productRelated: PropTypes.array,
  };

  componentDidMount() {
    const { product, fetchProductRelated } = this.props;

    fetchProductRelated(product);
  }

  onRowClickHandle = (product) => this.props.onViewProductScreen({ product });

  render() {
    const { productRelated } = this.props;
    const {
      theme: {
        colors: { background, text },
      },
      currency,
    } = this.props;

    if (size(productRelated) === 0) {
      return <View />;
    }

    return (
      <View style={[styles.wrap, { backgroundColor: background }]}>
        <View style={styles.head}>
          <Text style={[styles.headTitle, { color: text }]}>
            {Languages.ProductRelated}
          </Text>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            overScrollMode="never"
            horizontal
            data={productRelated}
            renderItem={({ item, index }) => (
              <PostLayout
                post={item}
                key={`key-${index}`}
                onViewPost={() => this.onRowClickHandle(item)}
                layout={Constants.Layout.threeColumn}
                currency={currency}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

ProductRelated.defaultProps = {
  productRelated: [],
};

const mapStateToProps = ({ products, currency }) => ({
  productRelated: products.productRelated,
  currency,
});

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
)(withTheme(ProductRelated));
