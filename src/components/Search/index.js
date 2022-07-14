/** @format */

import React, { PureComponent } from "react";
import { Text, FlatList, View, Animated } from "react-native";
import { connect } from "react-redux";

import { Constants, Languages, withTheme } from "@common";
import { FlatButton, Spinkit, ProductItem } from "@components";
import { BlockTimer, warn } from "@app/Omni";
import styles from "./styles";

import SearchBar from "./SearchBar";
import Recents from "./Recents";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.page = props.currentSearchPage;
    this.limit = Constants.pagingLimit;
    this.state = {
      text: "",
      isSubmit: false,
      loading: false,
      focus: true,
      scrollY: new Animated.Value(0),
      filter: {},
    };
  }

  onBack = () => {
    this.setState({ text: "" });
    Keyboard.dismiss();
    this.props.onBack();
  };

  startNewSearch = async () => {
    const { list } = this.props;
    this.page = 1;
    this.setState({ loading: true, isSubmit: true });
    await this.props.fetchProductsByName(
      this.state.text,
      this.limit,
      this.page
    );
    if (typeof list !== "undefined") {
      this.setState({ loading: false });
    }
  };

  onRowClickHandle = (product) => {
    BlockTimer.execute(() => {
      this.props.onViewProductScreen({ product });
    }, 1000);
  };

  renderItem = ({ item }) => {
    return (
      <ProductItem
        small
        product={item}
        onPress={() => this.onRowClickHandle(item)}
      />
    );
  };

  nextPosts = () => {
    this.page += 1;
    if (Object.keys(this.state.filter).length > 0) {
      this.props.filterProducts(
        this.state.text,
        this.limit,
        this.page,
        this.state.filter
      );
    } else {
      this.props.fetchProductsByName(this.state.text, this.limit, this.page);
    }
  };

  renderHeader = () => {
    const {
      theme: {
        colors: { background, text },
      },
      navigation,
    } = this.props;

    return (
      <Recents
        histories={this.props.histories}
        searchText={this.state.text}
        onClear={this.props.clearSearchHistory}
        onSearch={this.onSearch}
      />
    );
  };

  renderResultList = () => {
    const { list, isFetching, isSearchMore } = this.props;
    const { text } = this.state;
    // console.log(list,'searchList')
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.scrollY,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <AnimatedFlatList
        keyExtractor={(item, index) => `${item.id} || ${index}`}
        contentContainerStyle={styles.flatlist}
        data={list}
        scrollEventThrottle={1}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={() => {
          return isSearchMore && text.length > 0 ? (
            <View style={styles.more}>
              <FlatButton
                name="arrow-down"
                text={isFetching ? "LOADING..." : "MORE"}
                load={this.nextPosts}
              />
            </View>
          ) : null;
        }}
        {...{ onScroll }}
        ListEmptyComponent={() => {
          return (
            <Text style={{ textAlign: "center",color:this.props.isDarkTheme?"#fff":"" }}>
              {Languages.NoResultError}
            </Text>
          );
        }}
      />
    );
  };

  render() {
    const {
      theme: {
        colors: { background, text },
      },
      isSearchMore,
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <SearchBar
          scrollY={this.state.scrollY}
          autoFocus={this.state.focus}
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={this.searchProduct}
          onClear={() => this.setState({ text: "", filter: {} })}
          onFilter={() => this.props.onFilter(this.onFilter)}
          isShowFilter={this.state.text !== "" || this.props.list.length > 0}
          haveFilter={Object.keys(this.state.filter).length > 0}
        />

        {this.props.isFetching ? <Spinkit /> : this.renderResultList()}
      </View>
      // <InstantSearch />
    );
  }

  searchProduct = () => {
    this.props.saveSearchHistory(this.state.text);
    this.startNewSearch();
  };

  onSearch = (text) => {
    this.setState({ text }, this.searchProduct);
  };

  onFilter = async (filter, page = 1) => {
    const { list } = this.props;
    this.page = page;
    this.setState({ loading: true, isSubmit: true, filter });
    await this.props.filterProducts(
      this.state.text,
      this.limit,
      this.page,
      filter
    );
    if (typeof list !== "undefined") {
      this.setState({ loading: false });
    }
  };
}

Search.defaultProps = {
  histories: [],
  isSearchMore: false,
  currentSearchPage: 1,
};

const mapStateToProps = ({ products,app }) => ({
  list: products.productsByName,
  isFetching: products.isFetching,
  histories: products.histories,
  isSearchMore: products.isSearchMore,
  currentSearchPage: products.currentSearchPage,
  isDarkTheme:app.isDarkTheme
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProductRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByName: (name, per_page, page, filter = {}) => {
      if (name.length > 0) {
        actions.fetchProductsByName(dispatch, name, per_page, page, filter);
      }
    },
    saveSearchHistory: (searchText) => {
      if (searchText.length > 0) {
        actions.saveSearchHistory(dispatch, searchText);
      }
    },
    clearSearchHistory: () => {
      actions.clearSearchHistory(dispatch);
    },
    filterProducts: (name, per_page, page, filter = {}) => {
      actions.fetchProductsByName(dispatch, name, per_page, page, filter);
    },
  };
};
module.exports = connect(mapStateToProps, null, mergeProps)(withTheme(Search));
