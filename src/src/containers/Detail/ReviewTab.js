/** @format */

"use strict";

import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { toast } from "@app/Omni";
import { Constants, Color, Languages } from "@common";

import Spinner from "@components/Spinner";
import styles from "./ReviewTab_Style.js";
import ReviewItem from "./ListItem/ReviewItem.js";

class ReviewTab extends Component {
  componentDidMount() {
    this.props.fetchReviews(this.props.product.id);
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }

  renderContent() {
    if (this.props.isFetching) {
      return <Spinner fullStretch />;
    }

    if (this.props.message && this.props.message.length > 0) {
      return <Text style={styles.message}> {this.props.message}</Text>;
    }

    if (this.props.reviews && this.props.reviews.length == 0) {
      return <Text style={styles.message}> {Languages.NoReview}</Text>;
    }

    if (this.props.reviews && this.props.reviews.length > 0) {
      return (
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          style={styles.list}
          enableEmptySections={true}
          data={this.props.reviews}
          renderItem={({ item, index }) => (
            <ReviewItem key={index} review={item} />
          )}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
    reviews: state.products.reviews,
    isFetching: state.products.isFetching,
    message: state.products.message,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require("./../../redux/ProductRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchReviews: (productId) => {
      if (!netInfo.isConnected) return toast(Languages.NoConnection);
      actions.fetchReviewsByProductId(dispatch, productId);
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(ReviewTab);
