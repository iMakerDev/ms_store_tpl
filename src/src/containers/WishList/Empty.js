/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { Languages, Images, withTheme } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

class PaymentEmpty extends PureComponent {
  render() {
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.content}>
          <View>
            <Image
              source={Images.IconHeart}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { color: text }]}>
            {Languages.EmptyWishList}
          </Text>
          <Text style={[styles.message, { color: text }]}>
            {Languages.NoWishListItem}
          </Text>
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}

export default withTheme(PaymentEmpty);
