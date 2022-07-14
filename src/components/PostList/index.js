/** @format */

import React, { PureComponent } from "react";
import { FlatList, Text, RefreshControl, Animated, View } from "react-native";
import { connect } from "react-redux";

import { PostLayout, PostBanner } from "@components";
import { Constants, Layout, withTheme } from "@common";

import styles from "./styles";

const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE =
  Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

@withTheme
class PostList extends PureComponent {
  state = { scrollY: new Animated.Value(0) };

  constructor(props) {
    super(props);
    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.isProductList = props.type === undefined;
  }

  componentDidMount() {
    this.page === 1 && this.fetchData();
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    if (this.isProductList) {
      this.props.initProduct();
      this.props.fetchProducts(this.limit, this.page);
    } else {
      this.props.initNews();
      this.props.fetchNews(this.limit, this.page);
    }
  };

  _handleLoadmore = () => {
    this.nextPosts();
  };

  onRowClickHandle = (item) => {
    if (this.isProductList) {
      this.props.onViewProductScreen({ product: item });
    } else {
      this.props.onViewNewsScreen({ post: item });
    }
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;
    let layout = null;

    if (typeof this.props.layoutHome !== "undefined") {
      layout = this.props.layoutHome;
    }

    // only use parentCard prop if it is kind of Horizontal
    if (
      layout == null ||
      (layout == Constants.Layout.horizon &&
        typeof this.props.parentLayout !== "undefined")
    ) {
      layout = this.props.parentLayout;
    }

    // update layout for advance mod
    if (layout === Constants.Layout.advance) {
      layout = Layout[index % Layout.length];
    }

    return (
      <PostLayout
        post={item}
        type={this.props.type}
        key={`key-${index}`}
        onViewPost={() => this.onRowClickHandle(item, this.props.type)}
        layout={layout}
        currency={this.props.currency}
      />
    );
  };

  nextPosts = () => {
    this.page += 1;

    if (this.isProductList) {
      this.props.fetchProducts(this.limit, this.page);
    } else {
      this.props.fetchNews(this.limit, this.page);
    }
  };

  headerComponent = () => {
    const {
      type,
      headerLabel,
      theme: {
        colors: { text },
      },
    } = this.props;

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -150],
      extrapolate: "clamp",
    });

    if (typeof headerLabel != "undefined") {
      return (
        <View style={styles.headerLabel}>
          <View style={styles.headerLeft}>
            <Text style={[styles.tagHeader, { color: text }]}>
              {headerLabel}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <PostBanner
        onViewItem={this.onRowClickHandle}
        type={type}
        animateOpacity={animateOpacity}
        animate={titleTranslate}
      />
    );
  };

  render() {
    const { list, isFetching, parentLayout } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    // override numColumns
    let numColumns = 1;
    let styless = {};

    if (typeof parentLayout != "undefined") {
      if (parentLayout == Constants.Layout.twoColumn) {
        numColumns = 2;
        styless = {};
      }
      if (parentLayout == Constants.Layout.threeColumn) {
        numColumns = 3;
        styless = {};
      } else {
        // advance layout
        styless = { flexWrap: "wrap", flexDirection: "row" };
      }
    }
    if (!this.isProductList) {
      numColumns = 3;
      styless = {};
    }

    return (
      <FlatList
        overScrollMode="never"
        style={{ backgroundColor: background }}
        contentContainerStyle={[
          styles.flatlist,
          { backgroundColor: background },
          styless,
        ]}
        data={list}
        key={numColumns === 1 ? "1" : numColumns === 2 ? "2" : "3"}
        keyExtractor={(item, index) => `post_${item.id}_${index}`}
        renderItem={this.renderItem}
        scrollEventThrottle={1}
        numColumns={numColumns}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => this.fetchData(true)}
          />
        }
        ListHeaderComponent={this.headerComponent}
        onEndReachedThreshold={10}
        onEndReached={this._handleLoadmore}
      />
    );
  }
}

const mapStateToProps = ({ products, news, page, currency }, ownProps) => {
  const list =
    typeof ownProps.type === "undefined" ? products.listAll : news.list;
  const isFetching = products.isFetching || news.isFetching;
  const layoutHome = products.layoutHome;
  return { list, isFetching, page, layoutHome, currency };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const Product = require("@redux/ProductRedux");
  const News = require("@redux/NewsRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchProducts: (per_page, page) => {
      Product.actions.fetchAllProducts(dispatch, per_page, page);
    },
    fetchNews: (per_page, page) => {
      News.actions.fetchNews(dispatch, per_page, page);
    },
    initProduct: () => dispatch(Product.actions.initProduct()),
    initNews: () => dispatch(News.actions.initNews()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(PostList);
