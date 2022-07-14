/** @format */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import styles from "./ReviewItem_Style.js";
import Rating from "@components/Rating";
import moment from "moment";
import { Constants } from "@common";

export default class ReviewItem extends Component {
  render() {
    let { review } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{review.reviewer}</Text>
        <Text style={styles.review}>{review.review.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: 'row'
          }}>
          <Text style={styles.date_created}>
            {this.dateFormat(review.date_created)}
          </Text>
          <Rating rating={review.rating} style={styles.rating} />
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  dateFormat(date) {
    return moment.parseZone(date).format("MMMM DD, YYYY, HH:mm");
  }
}
