/** @format */

import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { Languages, Images, withTheme } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

class PaymentEmpty extends PureComponent {
  render() {
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    return (
      <View style={[styles.emptyContainer, {backgroundColor: background}]}>
        <View style={styles.content}>
          <View>
            <Image
              source={Images.IconOrder}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, {color: text}]}>{Languages.MyOrder}</Text>
          <Text style={[styles.message, {color: text}]}>{this.props.text}</Text>

          <ShopButton
            onPress={this.props.onReload}
            text={Languages.reload}
            css={{
              backgroundColor: "#ccc",
              marginTop: 20,
              width: 120,
              height: 40,
            }}
          />
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}

export default withTheme(PaymentEmpty)
