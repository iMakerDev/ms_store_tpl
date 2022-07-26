/** @format */

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Images, Styles, withTheme } from "@common";
import { ProductPrice, ImageCache, DisCount } from "@components";
import { getProductImage } from "@app/Omni";
import { LinearGradient } from "@expo";
import { getCountDownTimer } from "../../utils/dateTime";

import css from "./style";

class BannerSale extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      countDown: getCountDownTimer(this.props.product.date_on_sale_to),
    };
  }

  componentDidMount() {
    const { date_on_sale_to } = this.props.product;

    this._interval = setInterval(() => {
      this.setState({ countDown: getCountDownTimer(date_on_sale_to) });
    }, 60000);
  }

  componentWillUnmount() {
    this._interval && clearInterval(this._interval);
  }

  render() {
    const { product, title, viewPost, config, currency } = this.props;

    const { countDown } = this.state;
    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, Styles.width - 50)
        : Images.PlaceHolderURL;

    return config.countdown ? (
      <LinearGradient colors={config.background}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={css.panelSale}
          onPress={viewPost}>
          <ImageCache uri={imageURI} style={css.imagePanelThree} />
          <Text
            numberOfLines={2}
            style={[css.nameThree, { color: config.textColor }]}>
            {title}
          </Text>
          <ProductPrice
            currency={currency}
            product={product}
            hideDisCount
            fontStyle={{ color: config.textColor }}
          />
          {config.showDateTime && (
            <Text style={css.textCountdown}>{countDown}</Text>
          )}
          {product && <DisCount product={product} />}
        </TouchableOpacity>
      </LinearGradient>
    ) : (
      <View />
    );
  }
}

export default withTheme(BannerSale);
