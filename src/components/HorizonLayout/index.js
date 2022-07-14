/** @format */

import React, { PureComponent } from "react";
import { Images, Constants, Styles, Tools } from "@common";
import { getProductImage } from "@app/Omni";

import ColumnHigh from "./OneColumn";
import TwoColumn from "./TwoColumn";
import ThreeColumn from "./ThreeColumn";
import Card from "./Card";
import BannerLarge from "./BannerLarge";
import Banner from "./Banner";
import BannerHigh from "./BannerHigh";
import BannerSale from "./BannerSale";

export default class HorizonLayout extends PureComponent {
  viewPost = () => {
    const { onViewPost, product } = this.props;
    onViewPost(product);
  };

  render() {
    const { product, config, currency, layout } = this.props;
    const title = Tools.getDescription(product.name);
    const imageURL =
      product.images.length > 0
        ? getProductImage(product.images[0].src, Styles.width)
        : Images.PlaceHolderURL;

    const props = {
      imageURL,
      title,
      viewPost: this.viewPost,
      product,
      config,
      currency,
    };

    switch (layout) {
      case Constants.Layout.BannerSale:
        return <BannerSale {...props} />;
      case Constants.Layout.twoColumn:
        return <TwoColumn {...props} />;
      case Constants.Layout.threeColumn:
        return <ThreeColumn {...props} />;
      case Constants.Layout.BannerLarge:
        return <BannerLarge {...props} />;
      case Constants.Layout.card:
        return <Card {...props} />;
      case Constants.Layout.Banner:
        return <Banner {...props} />;
      case Constants.Layout.BannerHigh:
        return <BannerHigh {...props} />;
      default:
        return <ColumnHigh {...props} />;
    }
  }
}
