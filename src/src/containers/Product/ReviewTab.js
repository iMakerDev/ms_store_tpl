/** @format */

// eslint-disable-next-line max-classes-per-file
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Color, Languages } from "@common";

import Rating from "@components/Rating";
import Spinner from "@components/Spinner";

import { WooWorker } from "api-ecommerce";
import moment from "moment";

export default class ReviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, // Flag to know we are retrieving data or not.
      dataSource: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const self = this;
    self.setState({ isLoading: true });
    WooWorker.reviewByProductId(this.props.product.id, (data) => {
      self.setState({ isLoading: false, dataSource: data });
    });
  }

  render() {
    return (
      <View style={{ minHeight: 60 }}>
        {this.state.isLoading ? (
          <Spinner fullStretch />
        ) : this.state.dataSource.length == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text> {Languages.NoReview}</Text>
          </View>
        ) : (
          <View>
            {this.state.dataSource.map((review, i) => (
              <ReviewRow key={i} review={review} />
            ))}
          </View>
        )}
      </View>
    );
  }
}

class ReviewRow extends Component {
  constructor(props) {
    super(props);
    this.dateFormat = this.dateFormat.bind(this);
  }

  render() {
    return (
      <View style={styles.review_container}>
        <Text style={styles.review_name}> {this.props.review.name}</Text>
        <Text style={styles.review_review}> {this.props.review.review}</Text>
        <View style={styles.review_btm_container}>
          <View style={styles.review_btm_left}>
            <Text style={styles.review_date}>
              {" "}
              {this.dateFormat(this.props.review.date_created)}
            </Text>
          </View>
          <View style={styles.review_btm_right}>
            <Rating rating={this.props.review.rating} />
          </View>
        </View>
      </View>
    );
  }

  dateFormat(date) {
    return moment.parseZone(date).format("MMMM DD, YYYY");
  }
}

const styles = StyleSheet.create({
  review_container: {
    borderColor: Color.product.ViewBorder,
    marginTop: 20,
    borderWidth: 1,
  },
  review_btm_container: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: Color.product.ViewBorder,
  },
  review_btm_left: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    borderRightWidth: 1,
    borderColor: Color.product.ViewBorder,
  },
  review_btm_right: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  review_name: {
    color: Color.product.TextDark,
    fontSize: 24,
    margin: 15,
  },
  review_review: {
    color: Color.product.TextDark,
    fontSize: 14,
    margin: 15,
    marginTop: 0,
    textAlign: "justify",
  },
  review_date: {
    color: Color.product.TextDark,
    fontSize: 14,
    margin: 10,
  },
});
