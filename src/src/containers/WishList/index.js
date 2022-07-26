/** @format */

import React, { PureComponent } from "react";
import {
  Animated,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { SwipeRow } from "react-native-swipe-list-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Constants, Languages, withTheme, Config } from "@common";
import { Button, ProductItem, AnimatedHeader } from "@components";
import WishListEmpty from "./Empty";
import styles from "./styles";


class WishList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  onNext = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  renderHiddenRow(rowData, index) {
    return (
      <TouchableOpacity
        style={styles.hiddenRow}
        onPress={() => {
          this.props.removeWishListItem(rowData.product, rowData.variation);
        }}>
        <View style={{ marginRight: 23 }}>
          <FontAwesome name="trash" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  moveAllToCart = () => {
    if (this.props.wishListItems.length === 0) alert(Languages.EmptyAddToCart);
    else {
      this.props.wishListItems.forEach((item) => {
        const inCartTotal = this.props.cartItems.reduce(
          (accumulator, currentValue) => {
            if (currentValue.product.id == item.product.id) {
              return accumulator + currentValue.quantity;
            }
            return 0;
          },
          0
        );
        const limit = item.product.manage_stock ? (item.product.stock_quantity ? item.product.stock_quantity : 0) : Constants.LimitAddToCart

        if (inCartTotal < limit)
          this.props.addCartItem(item.product, item.variation);
        else alert(Languages.ProductLimitWaring.replace("{num}", limit));
      });
    }
  };

  cleanAll = () => {
    const self = this;
    this.props.wishListItems.forEach((currentValue, index, array) => {
      self.props.removeWishListItem(
        currentValue.product,
        currentValue.variation
      );
    });
  };

  render() {
    const { wishListItems, onViewProduct } = this.props;
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    const titleTransformY = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -43],
      extrapolate: "clamp",
    });

    if (wishListItems.length == 0) {
      return <WishListEmpty onViewHome={this.props.onViewHome} />;
    }
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <AnimatedHeader
          scrollY={this.state.scrollY}
          label={Languages.WishList}
        />

        <Animated.Text
          style={[
            styles.value,
            { transform: [{ translateY: titleTransformY }] },
          ]}>
          {wishListItems.length}{" "}
          {wishListItems.length > 1 ? Languages.Items : Languages.Item}
        </Animated.Text>

        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}>
          <View style={styles.list}>
            {wishListItems &&
              wishListItems.map((item, index) => (
                <SwipeRow
                  key={`wishlist${index}`}
                  disableRightSwipe
                  leftOpenValue={75}
                  rightOpenValue={-75}>
                  {this.renderHiddenRow(item, index)}
                  <ProductItem
                    key={index}
                    product={item.product}
                    onPress={() => onViewProduct({ product: item.product })}
                    variation={item.product.variation}
                  />
                </SwipeRow>
              ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.buttonContainer,
            Config.Affiliate.enable && { justifyContent: "center" },
          ]}>
          <Button
            text={Languages.CleanAll}
            style={[styles.button, { backgroundColor: "#ff1744" }]}
            textStyle={styles.buttonText}
            onPress={this.cleanAll}
          />
          {!Config.Affiliate.enable && (
            <Button
              text={Languages.MoveAllToCart}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={this.moveAllToCart}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishListItems: state.wishList.wishListItems,
    cartItems: state.carts.cartItems,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("./../../redux/CartRedux");
  const WishListRedux = require("./../../redux/WishListRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      CartRedux.actions.addCartItem(dispatch, product, variation);
    },
    removeWishListItem: (product, variation) => {
      WishListRedux.actions.removeWishListItem(dispatch, product, variation);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(WishList));
