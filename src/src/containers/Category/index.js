/** @format */

import React, { PureComponent } from "react";
import {
  View,
  RefreshControl,
  ScrollView,
  Animated,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { isObject } from "lodash";

import { Languages, withTheme } from "@common";
import { Timer, toast, BlockTimer } from "@app/Omni";
import LogoSpinner from "@components/LogoSpinner";
import Empty from "@components/Empty";
import { DisplayMode } from "@redux/CategoryRedux";
import FilterPicker from "@containers/FilterPicker";
import ProductRow from "./ProductRow";
import ControlBar from "./ControlBar";
import styles from "./styles";

class CategoryScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      loadingBuffer: true,
      modalVisible: false,
      displayControlBar: true,
    };
    this.pageNumber = 1;

    this.renderList = this.renderList.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderScrollComponent = this.renderScrollComponent.bind(this);
    this.onRowClickHandle = this.onRowClickHandle.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefreshHandle = this.onRefreshHandle.bind(this);
    this.onListViewScroll = this.onListViewScroll.bind(this);

    this.openCategoryPicker = () => this.setState({ modalVisible: true });
    this.closeCategoryPicker = () => this.setState({ modalVisible: false });
  }

  componentDidMount() {
    Timer.setTimeout(() => this.setState({ loadingBuffer: false }), 1000);

    const {
      fetchProductsByCategoryId,
      clearProducts,
      selectedCategory,
    } = this.props;
    clearProducts();
    if (selectedCategory) {
      fetchProductsByCategoryId(selectedCategory.id, this.pageNumber++);
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    const { error } = nextProps.products;
    if (error) toast(error);

    if (props.filters !== nextProps.filters) {
      this.newFilters = this._getFilterId(nextProps.filters);

      this.pageNumber = 1;
      props.clearProducts();
      props.fetchProductsByCategoryId(
        null,
        this.pageNumber++,
        20,
        this.newFilters
      );
    }

    if (props.selectedCategory != nextProps.selectedCategory) {
      this.pageNumber = 1;
      props.clearProducts();
      props.fetchProductsByCategoryId(
        nextProps.selectedCategory.id,
        this.pageNumber++
      );
    }
  }

  _getFilterId = (filters) => {
    let newFilters = {};
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value) {
        newFilters = {
          ...newFilters,
          [key]: isObject(value) ? value.id || value.term_id : value,
        };
      }
    });
    // warn(newFilters);
    if (newFilters.price) {
      newFilters.max_price = newFilters.price;
      delete newFilters.price;
    }
    if (!newFilters.category) {
      newFilters.category = this.props.selectedCategory.id;
    }
    return newFilters;
  };

  render() {
    const { modalVisible, loadingBuffer, displayControlBar } = this.state;
    const {
      products,
      selectedCategory,
      filters,
      fetchProductsByCategoryId,
    } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    if (!selectedCategory) return null;

    if (products.error) {
      return <Empty text={products.error} />;
    }

    if (loadingBuffer) {
      return <LogoSpinner fullStretch />;
    }

    const marginControlBar = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange: [0, 0, -50, -50],
    });

    const name =
      (filters && filters.category && filters.category.name) ||
      selectedCategory.name;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Animated.View style={{ marginTop: marginControlBar }}>
          <ControlBar
            openCategoryPicker={this.openCategoryPicker}
            isVisible={displayControlBar}
            fetchProductsByCategoryId={fetchProductsByCategoryId}
            name={name}
          />
        </Animated.View>
        {this.renderList(products.list)}
        <FilterPicker
          closeModal={this.closeCategoryPicker}
          visible={modalVisible}
        />
      </View>
    );
  }

  renderList = (data) => {
    const { products, displayMode } = this.props;
    const isCardMode = displayMode == DisplayMode.CardMode;

    return (
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        data={data}
        renderItem={this.renderRow}
        enableEmptySections
        onEndReached={this.onEndReached}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isCardMode ? false : products.isFetching}
            onRefresh={this.onRefreshHandle}
          />
        }
        contentContainerStyle={styles.listView}
        initialListSize={6}
        pageSize={2}
        renderScrollComponent={this.renderScrollComponent}
      />
    );
  };

  renderRow = (product) => {
    const { displayMode, currency } = this.props;
    const onPress = () => this.onRowClickHandle(product.item);
    const isInWishList =
      this.props.wishListItems.find(
        (item) => item.product.id === product.id
      ) !== undefined;

    return (
      <ProductRow
        product={product.item}
        onPress={onPress}
        displayMode={displayMode}
        wishListItems={this.props.wishListItems}
        isInWishList={isInWishList}
        addToWishList={this.addToWishList}
        removeWishListItem={this.removeWishListItem}
        currency={currency}
      />
    );
  };

  renderScrollComponent = (props) => {
    const { displayMode } = this.props;
    const mergeOnScroll = (event) => {
      props.onScroll(event);
      this.onListViewScroll(event);
    };

    if (displayMode == DisplayMode.CardMode) {
      return (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          props
          {...props}
          onScroll={mergeOnScroll}
        />
      );
    }

    return <ScrollView props {...props} onScroll={mergeOnScroll} />;
  };

  addToWishList = (product) => {
    this.props.addWishListItem(product);
  };

  removeWishListItem = (product) => {
    this.props.removeWishListItem(product);
  };

  onRowClickHandle = (product) => {
    BlockTimer.execute(() => {
      this.props.onViewProductScreen({ product });
    }, 500);
  };

  onEndReached = () => {
    const {
      products,
      fetchProductsByCategoryId,
      selectedCategory,
    } = this.props;
    if (!products.isFetching && products.stillFetch) {
      if (this.newFilters) {
        fetchProductsByCategoryId(
          selectedCategory.id,
          this.pageNumber++,
          20,
          this.newFilters
        );
      } else {
        fetchProductsByCategoryId(selectedCategory.id, this.pageNumber++);
      }
    }
  };

  onRefreshHandle = () => {
    const {
      fetchProductsByCategoryId,
      clearProducts,
      selectedCategory,
    } = this.props;
    this.pageNumber = 1;
    clearProducts();
    fetchProductsByCategoryId(
      selectedCategory.id,
      this.pageNumber++,
      20,
      this.newFilters
    );
  };

  onListViewScroll(event) {
    this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.categories.selectedCategory,
    netInfo: state.netInfo,
    displayMode: state.categories.displayMode,
    products: state.products,
    wishListItems: state.wishList.wishListItems,
    filters: state.filters,
    currency: state.currency,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProductRedux");
  const WishListRedux = require("@redux/WishListRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByCategoryId: (
      categoryId,
      page,
      per_page = 20,
      filters = {}
    ) => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchProductsByCategoryId(
        dispatch,
        categoryId,
        per_page,
        page,
        filters
      );
    },
    clearProducts: () => dispatch(actions.clearProducts()),
    addWishListItem: (product) => {
      WishListRedux.actions.addWishListItem(dispatch, product, null);
    },
    removeWishListItem: (product, variation) => {
      WishListRedux.actions.removeWishListItem(dispatch, product, null);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(CategoryScreen));
