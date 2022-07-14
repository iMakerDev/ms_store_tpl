/** @format */

import React, { Component } from "react";
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Animated,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { PostLayout, AnimatedHeader, Spinkit, AdMob } from "@components";
import { Constants, Languages, withTheme } from "@common";
import { connect } from "react-redux";
import styles from "./styles";

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE =
//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductList extends Component {
  state = { scrollY: new Animated.Value(0) };

  constructor(props) {
    super(props);

    this.page = props.page ? props.page : 0;
    this.limit = Constants.pagingLimit;
    this.isProductList = props.type === undefined;
  }

  componentDidMount() {
    this.page === 0 && this.fetchData();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list;
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { config, index, fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config.category, config.tag, this.page, index);
  };

  handleLoadMore = () => {
    this.page += 1;
    this.fetchData();
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

    const layout = Constants.Layout.twoColumn;

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

  headerComponent = () => {
    const { headerImage } = this.props;

    return (
      <View style={styles.headerView}>
        <AdMob />
        {headerImage && (
          <Image style={styles.bannerImage} source={headerImage} />
        )}
      </View>
    );
  };

  render() {
    const { list, config, isFetching, navigation } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    // const renderFooter = () => isFetching && <Spinkit />;
    const renderFooter = () => {
      return isFetching ? (
        <Spinkit />
      ) : (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.handleLoadMore}
            style={styles.footerBtn}>
            {isFetching ? (
              <Spinkit />
            ) : (
              <Text style={styles.footerBtnText}>{Languages.LoadMore}</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={[styles.listView, { backgroundColor: background }]}>
        {config.name && (
          <AnimatedHeader
            scrollY={this.state.scrollY}
            hideIcon
            label={config.name}
            navigation={navigation}
          />
        )}

        <AnimatedFlatList
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
          ListFooterComponent={renderFooter()}
          refreshing={isFetching}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => this.fetchData(true)}
            />
          }
          onEndReachedThreshold={0.5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: Platform.OS !== "androbid" }
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ layouts, currency }, ownProp) => {
  const index = ownProp.index;
  const list = layouts.layout[index].list;
  const isFetching = layouts.layout[index].isFetching;
  const finish = layouts.layout[index].finish;
  return { list, isFetching, finish, currency };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: LayoutActions } = require("@redux/LayoutRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByCollections: (category_id, tag_id, page, index) => {
      LayoutActions.fetchProductsLayoutTagId(
        dispatch,
        category_id,
        tag_id,
        page,
        index
      );
    },
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(ProductList));
