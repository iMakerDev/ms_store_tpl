/* eslint-disable */
/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  Image,
  Share,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { find, filter, get } from "lodash";

import { Timer, getProductImage, toast } from "@app/Omni";
import {
  Button,
  AdMob,
  WebView,
  ProductColor,
  ProductRelated,
  Rating,
  ActionSheets,
} from "@components";
import {
  Styles,
  Languages,
  Color,
  Config,
  Constants,
  Events,
  withTheme,
  Tools,
  Images,
} from "@common";

import AttributesView from "./AttributesView";
import ReviewTab from "./ReviewTab.js";
import PhotoModal from "./PhotoModal";
import styles from "./ProductDetail_Style";

const { width } = Dimensions.get("window");

const PRODUCT_IMAGE_HEIGHT = 300;
const NAVI_HEIGHT = 64;

class Detail extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    product: PropTypes.any,
    getProductVariations: PropTypes.func,
    productVariations: PropTypes.any,
    onViewCart: PropTypes.func,
    addCartItem: PropTypes.func,
    removeWishListItem: PropTypes.func,
    addWishListItem: PropTypes.func,
    cartItems: PropTypes.any,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      tabIndex: 0,
      // selectedAttribute: [],
      // selectedColor: 0,
      selectVariation: null,
      selectedImageId: 0, // is placeholder image
      selectedImage: null,
      attributeOption: null,
    };

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
    this.inCartTotal = 0;
    this.isInWishList = false;
  }

  componentDidMount() {
    this.getCartTotal(this.props);
    this.getWishList(this.props);

    this.getProductAttribute(this.props.product);

    // 获取产品变量
    this.props.getProductVariations(this.props.product);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getCartTotal(nextProps, true);
    this.getWishList(nextProps, true);

    // this important to update the variations from the product as the Life cycle is not run again !!!
    if (this.props.product !== nextProps.product) {
      this.props.getProductVariations(nextProps.product);
      this.getProductAttribute(nextProps.product);
      this.forceUpdate();
    }

    if (this.props.productVariations !== nextProps.productVariations) {
      this.updateSelectedVariant(nextProps.productVariations);
    }
  }

  getProductAttribute = (product) => {
    this.productAttributes = product.attributes;
    const defaultAttribute = product.default_attributes;

    if (typeof this.productAttributes !== "undefined") {
      this.productAttributes.map((attribute) => {
        const selectedAttribute = defaultAttribute.find(
          (item) => item.name === attribute.name
        );
        attribute.selectedOption =
          typeof selectedAttribute !== "undefined"
            ? selectedAttribute.option.toLowerCase()
            : "";
      });
    }
  };

  closePhoto = () => {
    this._modalPhoto.close();
  };

  openPhoto = () => {
    this._modalPhoto.open();
  };

  handleClickTab(tabIndex) {
    this.setState({ tabIndex });
    Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
  }

  getColor = (value) => {
    // const color = value.toLowerCase();
    if (typeof Color.attributes[value] !== "undefined") {
      return Color.attributes[value];
    }
    return "#333";
  };

  share = () => {
    Share.share({
      message: this.props.product.description.replace(/(<([^>]+)>)/gi, ""),
      url: this.props.product.permalink,
      title: this.props.product.name,
    });
  };

  addToCart = (go = false) => {
    const { addCartItem, product, onViewCart } = this.props;
    const { selectVariation } = this.state;
    // console.log(
    //   "Luyx: 🚀🚀🚀 ~ file: index.js ~ line 159 ~ Detail ~ selectVariation",
    //   selectVariation
    // );

    const limit = get(product, "manage_stock")
      ? get(product, "stock_quantity")
      : Constants.LimitAddToCart;

    if (this.inCartTotal < limit) {
      addCartItem(product, selectVariation);

      toast(Languages.AddedtoCart);
    } else {
      // eslint-disable-next-line no-alert
      alert(Languages.ProductLimitWaring.replace("{num}", limit));
    }
    if (go){
      onViewCart();
    } else{
      toast(Languages.AddedtoCart);
    }
  };

  addToWishList = (isAddWishList) => {
    if (isAddWishList) {
      this.props.removeWishListItem(this.props.product);
    } else this.props.addWishListItem(this.props.product);
  };

  getCartTotal = (props, check = false) => {
    const { cartItems, route, navigation, product } = props;

    if (cartItems !== null) {
      if (check === true && props.cartItems === cartItems) {
        return;
      }

      this.inCartTotal = cartItems.reduce((accumulator, currentValue) => {
        if (currentValue.product.id === product.id) {
          return accumulator + currentValue.quantity;
        }
        return 0;
      }, 0);

      const sum = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      );
      const params = route.params;
      params.cartTotal = sum;
      navigation.setParams(params);
    }
  };

  getWishList = (props, check = false) => {
    const { product, navigation, route, wishListItems } = props;

    if (props.hasOwnProperty("wishListItems")) {
      if (check && props.wishListItems === wishListItems) {
        return;
      }
      this.isInWishList =
        find(props.wishListItems, (item) => item.product.id === product.id) !==
        "undefined";

      const sum = wishListItems.length;
      const params = route.params;
      params.wistListTotal = sum;

      navigation.setParams(params);
    }
  };

  onSelectAttribute = (attributeName, option) => {
    const selectedAttribute = this.productAttributes.find(
      (item) => item.name.toLowerCase() === attributeName.toLowerCase()
    );
    selectedAttribute.selectedOption = option.toLowerCase();
    this.updateSelectedVariant(this.props.productVariations);
  };
  //更新所选样式
  updateSelectedVariant = (productVariations) => {
    let hasAttribute = false;
    const defaultVariant =
      productVariations && productVariations.length
        ? productVariations[0]
        : null;
    // filter selectedOption null or don't have variation
    //过滤选项为空
    const selectedAttribute = filter(
      this.productAttributes,
      (item) =>
        (item.selectedOption && item.selectedOption !== "") || item.variation
    );
    // console.log('==========', productVariations);
    // console.log('---------', selectedAttribute);


    let selectedImage =
      (defaultVariant && defaultVariant.image && defaultVariant.image.src) ||
      "";
    let selectedImageId = 0;

    if (productVariations && productVariations.length) {
      productVariations.map((variant) => {
        let matchCount = 0;
        selectedAttribute.map((selectAttribute) => {
          // console.log('selectAttributeName', selectAttribute.name);

          const isMatch = find(
            variant.attributes,
            (item) => {
              // console.log('item', item);
              // console.log('selectAttribute', selectAttribute);
              if (item.option.toUpperCase() ===
                selectAttribute.selectedOption.toUpperCase()) {
                // console.log('rrrrrrrrrrrr');
              }
              return item.name.toUpperCase() === selectAttribute.name.toUpperCase() &&
                item.option.toUpperCase() ===
                selectAttribute.selectedOption.toUpperCase()
            }
          );
          if (isMatch !== undefined) {
            matchCount += 1;
          }
        });

        if (matchCount === selectedAttribute.length) {
          hasAttribute = true;
          selectedImage = (variant.image && variant.image.src) || "";
          selectedImageId = variant.image.id;
          this.setState({
            selectVariation: variant,
            selectedImage,
            selectedImageId,
          });
        }
      });
    }

    // 设置默认属性
    if (!hasAttribute && defaultVariant) {
      this.setState({
        selectVariation: defaultVariant,
        selectedImage,
        selectedImageId,
      });
    }

    this.forceUpdate();
  };

  /**
   * render Image top
   */
  _renderImages = () => {
    const { selectedImage, selectedImageId } = this.state;
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
      outputRange: [2, 1, 1, 0.7],
      extrapolate: "clamp",
    });

    // set variant image and only show when do not placeholder image
    if (selectedImage && selectedImageId !== 0)
      return (
        <View
          style={{
            // height: PRODUCT_IMAGE_HEIGHT,
            width: Constants.Window.width,
          }}>
          <TouchableOpacity activeOpacity={1} onPress={this.openPhoto}>
            <Animated.Image
              source={{
                uri: getProductImage(this.state.selectedImage, Styles.width),
              }}
              style={[
                styles.imageProduct,
                { transform: [{ scale: imageScale }] },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );

    return (
      <FlatList
        contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
        ref={(comp) => (this._photos = comp)}
        data={this.props.product.images}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={this.openPhoto}>
              <Animated.Image
                source={{ uri: getProductImage(item.src, Styles.width) }}
                style={[
                  styles.imageProduct,
                  { transform: [{ scale: imageScale }] },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${item.id}` || index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    );
  };

  /**
   * Render tabview detail
   */
  _renderTabView = () => {
    const {
      theme: {
        colors: { background, text, lineColor },
      },
      product,
    } = this.props;

    return (
      <View style={[styles.tabView, { backgroundColor: background }]}>
        <View
          style={[
            styles.tabButton,
            { backgroundColor: lineColor },
            { borderTopColor: lineColor },
            { borderBottomColor: lineColor },
          ]}>
          <View style={[styles.tabItem, { backgroundColor: lineColor }]}>
            <Button
              type="tab"
              textStyle={[styles.textTab, { color: text }]}
              selectedStyle={{ color: text }}
              text={Languages.AdditionalInformation}
              onPress={() => this.handleClickTab(0)}
              selected={this.state.tabIndex === 0}
            />
          </View>
          <View style={[styles.tabItem, { backgroundColor: lineColor }]}>
            <Button
              type="tab"
              textStyle={[styles.textTab, { color: text }]}
              selectedStyle={{ color: text }}
              text={Languages.ProductFeatures}
              onPress={() => this.handleClickTab(1)}
              selected={this.state.tabIndex == 1}
            />
          </View>
          <View style={[styles.tabItem, { backgroundColor: lineColor }]}>
            <Button
              type="tab"
              textStyle={[styles.textTab, { color: text }]}
              selectedStyle={{ color: text }}
              text={Languages.ProductReviews}
              onPress={() => this.handleClickTab(2)}
              selected={this.state.tabIndex == 2}
            />
          </View>
        </View>
        {this.state.tabIndex === 0 && (
          <View style={[styles.description, { backgroundColor: lineColor }]}>
            <WebView
              textColor={text}
              html={`<p style="text-align: left">${product.description}</p>`}
            />
          </View>
        )}
        {this.state.tabIndex === 1 && (
          <AttributesView attributes={product.attributes} />
        )}
        {this.state.tabIndex === 2 && <ReviewTab product={product} />}
      </View>
    );
  };

  _writeReview = () => {
    const { product, userData, onLogin } = this.props;
    if (userData) {
      Events.openModalReview(product);
    } else {
      onLogin();
    }
  };

  renderActionSheet = (name, options, title) => {

    // console.log('3333', title);
    const titles = [];
    options.map((item, index) => {
      titles.push({ title: item });
    });
    titles.push({ title: "Cancel", isCancel: true, actionStyle: "cancel" });
    this.picker = name;
    return (
      <ActionSheets
        ref={`${name}`}
        titles={titles}
        separateHeight={1}
        separateColor="#dddddd"
        defaultValue={title}
        backgroundColor="rgba(0, 0, 0, 0.3)"
        containerStyle={{ margin: 10, borderRadius: 5 }}
        onPress={(val) => {
          const i = options.findIndex((item, index) => {
            return item.toLowerCase() === val.title.toLowerCase();
          });
          this.onSelectAttribute(name, options[i]);
        }}
      />
    );
  };
  //默认下拉选项
  _getDefaultTitle = (attribute) => {
    if (attribute?.selectedOption) {
      return attribute.selectedOption.toUpperCase();
    }
    //默认显示
    // const { selectVariation } = this.state;
    // console.log('selectVariation', selectVariation?.attributes);
    // if (selectVariation && selectVariation.attributes) {
    //   const currentAttribute = selectVariation?.attributes.find((att) => {
    //     return att?.name.toLowerCase() === attribute?.name.toLowerCase();
    //   });

    //   return currentAttribute?.option?.toUpperCase();
    // }
  };
  //下拉框
  renderDropdown = (attribute) => {
    const title = this._getDefaultTitle(attribute);
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.refs[`${attribute.name}`].show()}
        style={styles.dropdownStyle}>
        <View style={[styles.dropdownLeftStyle, {}]}>
          <Text style={{ fontSize: 13, color: text }}>
            {attribute.name.toUpperCase()}
          </Text>
        </View>
        <View style={styles.dropdownRightStyle}>
          <View style={styles.dropdownRightTitleStyle}>
            <Text style={[styles.dropdownTextStyle, { color: text }]}>
              {title}
            </Text>
          </View>
          <View style={styles.dropdownRightIconStyle}>
            <Image
              source={Images.IconDropdown}
              style={[styles.iconStyle, { tintColor: text }]}
            />
          </View>
        </View>
        {this.renderActionSheet(attribute.name, attribute.options, title)}
      </TouchableOpacity>
    );
  };

  isOutOfStock = () => {
    const { selectVariation } = this.state;
    const { product } = this.props;

    return (
      get(product, "stock_status") !== "instock" ||
      (get(product, "manage_stock")
        ? get(product, "stock_quantity") < this.inCartTotal ||
        get(product, "stock_quantity") < 1
        : false)
    );
  };

  renderProductRelated = () => {
    const { onViewProductScreen, product } = this.props;

    return (
      <ProductRelated
        onViewProductScreen={(p) => {
          onViewProductScreen(p);
        }}
        product={product}
      />
    );
  };
  //选择尺码
  _renderAttributes = () => {
    return (
      <View>
        {typeof this.productAttributes !== "undefined" &&
          this.productAttributes.map((attribute, attrIndex) => (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={`attr_${attrIndex}`}
              style={[
                styles.productSizeContainer,
                Constants.RTL && { flexDirection: "row-reverse" },
              ]}>
              {attribute.name.toLowerCase() !==
                Constants.productAttributeColor.toLowerCase() && (
                  <View style={{ width: width * 0.85 }}>
                    {this.renderDropdown(attribute)}
                  </View>
                )}
            </View>
          ))}
      </View>
    );
  };
  //重构颜色选择
  _renderProductColor = () => {
    return (
      <View>
        {typeof this.productAttributes !== "undefined" &&
          this.productAttributes.map((attribute, attrIndex) => (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={`attr_${attrIndex}`}
              style={[
                styles.productSizeContainer,
                Constants.RTL && { flexDirection: "row-reverse" },
              ]}>
              {attribute.name.toLowerCase() ===
                Constants.productAttributeColor.toLowerCase() && (
                  <View style={{ width: width * 0.85 }}>
                    {this.renderDropdown(attribute)}
                  </View>
                )}
            </View>
          ))}
      </View>
    );
  };
  render() {
    const { selectVariation } = this.state;
    const {
      wishListItems,

      product,
      cartItems,
      theme: {
        colors: { background, text, lineColor },
        dark,
      },
      currency,
    } = this.props;

    const isAddToCart = !!(
      cartItems &&
      cartItems.filter((item) => item.product.id === product.id).length > 0
    );
    const isAddWishList =
      wishListItems.filter((item) => item.product.id === product.id).length > 0;
    const productPriceIncludedTax = Tools.getPriceIncludedTaxAmount(
      product,
      selectVariation,
      false,
      currency
    );
    const currentProduct = selectVariation || product;
    const regular_price = Tools.getRegularPrice({
      product: currentProduct,
      currency,
    });
    const productRegularPrice = Tools.getCurrencyFormatted(
      regular_price,
      currency
    );
    const isOnSale = selectVariation
      ? selectVariation.on_sale
      : product.on_sale;
    const outOfStock = this.isOutOfStock();
    //商品详情tab栏
    const renderButtons = () => (
      <View style={[styles.bottomView, dark && { borderTopColor: lineColor }]}>
        <View
          style={[
            styles.buttonContainer,
            dark && { backgroundColor: lineColor },
          ]}>
          <Button
            type="image"
            source={require("@images/icons/icon-share.png")}
            imageStyle={[styles.imageButton, { tintColor: text }]}
            buttonStyle={styles.buttonStyle}
            onPress={this.share}
          />
          <Button
            type="image"
            isAddWishList={isAddWishList}
            source={require("@images/icons/icon-love.png")}
            imageStyle={[styles.imageButton, { tintColor: text }]}
            buttonStyle={styles.buttonStyle}
            onPress={() => this.addToWishList(isAddWishList)}
          />
          {!Config.Affiliate.enable && (
            <Button
              type="image"
              isAddToCart={isAddToCart}
              source={require("@images/icons/icon-cart.png")}
              imageStyle={[styles.imageButton, { tintColor: text }]}
              disabled={outOfStock}
              buttonStyle={styles.buttonStyle}
              onPress={() =>
                product.stock_status === "instock" && this.addToCart()
              }
            />
          )}
        </View>
        <Button
          text={!outOfStock ? Languages.BUYNOW : Languages.OutOfStock}
          style={[styles.btnBuy, outOfStock && styles.outOfStock]}
          textStyle={styles.btnBuyText}
          disabled={outOfStock}
          onPress={() => {
            if (
              !Config.Affiliate.enable &&
              product.type !== Constants.ProductType.external
            ) {
              !outOfStock && this.addToCart(true);
            } else {
              this.props.onOpenWebsite(product.external_url);
            }
          }}
        />
      </View>
    );
    //评论
    const renderRating = () => {
      return (
        <View style={styles.price_wrapper(background)}>
          <Rating rating={Number(product.average_rating)} size={19} />

          <Text style={[styles.textRating, { color: text }]}>
            {`(${product.rating_count})`}
          </Text>

          <TouchableOpacity onPress={this._writeReview}>
            <Text style={[styles.textRating, { color: text }]}>
              {Languages.writeReview}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const renderTitle = () => (
      <View style={{ justifyContent: "center", marginTop: 6, marginBottom: 8 }}>
        <Text style={[styles.productName, { color: text }]}>
          {/*兼容web端标题换行*/}
          {product.name.replace(/<br>|<br\/>/g, "")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 4,
          }}>
          <Animatable.Text
            animation="fadeInDown"
            style={[styles.productPrice, { color: text }]}>
            {productPriceIncludedTax}
          </Animatable.Text>
          {isOnSale && (
            <Animatable.Text
              animation="fadeInDown"
              style={[styles.sale_price, { color: text }]}>
              {currentProduct.regular_price}
            </Animatable.Text>
          )}
        </View>
      </View>
    );
    //选择产品颜色
    const renderProductColor = () => {
      if (typeof this.productAttributes === "undefined") {
        return;
      }

      const productColor = this.productAttributes.find(
        (item) =>
          item.name.toLowerCase() ===
          Constants.productAttributeColor.toLowerCase()
      );
      if (productColor) {
        const translateY = this.state.scrollY.interpolate({
          inputRange: [0, PRODUCT_IMAGE_HEIGHT / 2, PRODUCT_IMAGE_HEIGHT],
          outputRange: [0, -PRODUCT_IMAGE_HEIGHT / 3, -PRODUCT_IMAGE_HEIGHT],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.productColorContainer,
              { transform: [{ translateY }] },
            ]}>
            {productColor.options.map((option, index) => (
              <ProductColor
                key={index.toString()}
                color={this.getColor(option)}
                onPress={() => {
                  this.onSelectAttribute(
                    Constants.productAttributeColor,
                    option
                  );
                }}
                selected={
                  productColor.selectedOption.toLowerCase() ===
                  option.toLowerCase()
                }
              />
            ))}
          </Animated.View>
        );
      }
    };

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <Animated.ScrollView
          ref={(c) => (this.list = c)}
          overScrollMode="never"
          style={styles.listContainer}
          scrollEventThrottle={1}
          onScroll={(event) => {
            this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
          }}>
          <View
            style={[styles.productInfo, { backgroundColor: background }]}
            onLayout={(event) =>
              (this.productInfoHeight = event.nativeEvent.layout.height)
            }>
            {this._renderImages()}
            {this._renderAttributes()}
            {this._renderProductColor()}
            {renderTitle()}
            {renderRating()}
          </View>
          {this._renderTabView()}
          {this.renderProductRelated()}
          <AdMob />
        </Animated.ScrollView>
        {/* {renderProductColor()} */}

        {renderButtons()}
        <PhotoModal ref={(com) => (this._modalPhoto = com)} product={product} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.carts.cartItems,
    wishListItems: state.wishList.wishListItems,
    productVariations: state.products.productVariations,
    userData: state.user.user,
    currency: state.currency,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  const WishListRedux = require("@redux/WishListRedux");
  const ProductRedux = require("@redux/ProductRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      CartRedux.actions.addCartItem(dispatch, product, variation);
    },
    addWishListItem: (product) => {
      WishListRedux.actions.addWishListItem(dispatch, product);
    },
    removeWishListItem: (product) => {
      WishListRedux.actions.removeWishListItem(dispatch, product);
    },
    getProductVariations: (product) => {
      ProductRedux.actions.getProductVariations(dispatch, product);
    },
  };
}

export default withTheme(
  connect(mapStateToProps, undefined, mergeProps)(Detail)
);
