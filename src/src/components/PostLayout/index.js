/** @format */

import React, { PureComponent } from "react";
import { Constants, Tools, Styles } from "@common";
import { getProductImage } from "@app/Omni";

import ReadMoreLayout from "./ReadMore";
import ColumnLayout from "./Column";
import ThreeColumn from "./ThreeColumn";
import CardLayout from "./Card";
import SimpleLayout from "./Simple";

export default class PostLayout extends PureComponent {
  viewCategoryDetail(id) {
    Tools.viewCateDetail(id);
    this.props.navigate("Default");
  }

  render() {
    const data = this.props.post;
    const { onViewPost, type, currency } = this.props;
    const isProduct = type == "undefined";

    let image_width = 0;
    let imageURL = "";

    const categories = this.props.categories ? this.props.categories : 1;
    const cate =
      typeof data.categories !== "undefined" ? data.categories[0] : 1;
    let postTitle = typeof data.name === "undefined" ? "" : data.name;

    if (typeof type !== "undefined") {
      // news type
      imageURL = Tools.getImage(data, Constants.PostImage.large);
      postTitle =
        typeof data.title !== "undefined"
          ? Tools.getDescription(data.title.rendered, 300)
          : "";
    } else {
      // product type
      image_width = Constants.Layout.card
        ? Styles.width
        : Styles.width * 0.45 - 2;
      imageURL =
        data.images && data.images.length
          ? getProductImage(data.images[0].src, image_width)
          : "";
    }

    switch (this.props.layout) {
      case Constants.Layout.simple:
        return (
          <SimpleLayout
            imageURL={imageURL}
            title={Tools.getDescription(postTitle, 100)}
            viewPost={onViewPost}
            post={data}
            type={type}
            category={categories[cate]}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );

      case Constants.Layout.card:
        return (
          <CardLayout
            imageURL={imageURL}
            title={Tools.getDescription(postTitle, 300)}
            viewPost={onViewPost}
            post={data}
            type={type}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );

      case Constants.Layout.twoColumn:
        return (
          <ColumnLayout
            imageURL={imageURL}
            title={Tools.getDescription(postTitle)}
            viewPost={onViewPost}
            post={data}
            type={type}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );

      case Constants.Layout.threeColumn:
        imageURL = isProduct
          ? getProductImage(data.images[0].src, Styles.width / 3)
          : imageURL;
        return (
          <ThreeColumn
            imageURL={imageURL}
            title={Tools.getDescription(postTitle)}
            viewPost={onViewPost}
            post={data}
            type={type}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );

      case Constants.Layout.list:
        return (
          <ReadMoreLayout
            imageURL={imageURL}
            title={Tools.getDescription(postTitle)}
            viewPost={onViewPost}
            post={data}
            type={type}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );

      default:
        imageURL = isProduct
          ? getProductImage(data.images[0].src, Styles.width / 3)
          : imageURL;
        return (
          <ThreeColumn
            imageURL={imageURL}
            title={Tools.getDescription(postTitle)}
            viewPost={onViewPost}
            post={data}
            type={type}
            date={type ? data.date : data.date_created}
            currency={currency}
          />
        );
    }
  }
}
