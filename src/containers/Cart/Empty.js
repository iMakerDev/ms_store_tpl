/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { Languages, Images, withTheme } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

const PaymentEmpty = ({ onViewHome, theme:{colors:{background,text}} }) => {
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.contentEmpty}>
        <View>
          <Image
            source={Images.IconCart}
            style={styles.icon}
            resizeMode="contain"
            tintColor={text}
          />
        </View>
        <Text style={[styles.title, {color: text}]}>{Languages.ShoppingCartIsEmpty}</Text>
        <Text style={[styles.message, {color: text}]}>{Languages.AddProductToCart}</Text>
      </View>

      <ShopButton onPress={onViewHome} />
    </View>
  );
};

PaymentEmpty.propTypes = {
  onViewHome: PropTypes.func.isRequired,
};

export default withTheme(PaymentEmpty);
