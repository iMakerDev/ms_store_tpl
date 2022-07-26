/** @format */

import React, { Component } from "react";
import { Text, View, Image } from "react-native";

import { Color, withTheme } from "@common";
import { TouchableScale } from "@components";

import styles from "./styles";

class Item extends Component {

  render() {
    const {
      item,
      label,
      onPress,
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View style={[styles.container,{marginTop:0}]}>
        <TouchableScale
          scaleTo={0.7}
          style={[styles.wrap]}
          onPress={() => onPress({ ...item, circle: true, name: label })}>
          <View
            style={[
              styles.background,
              {backgroundColor: Color.primary},
              { opacity: 0.08 },
            ]}
          />

          <View style={styles.iconView}>
            <Image
              source={{uri:item.image.src}}
              style={[styles.icon]}
            />
          </View>
          <Text style={[styles.title, { color: text },{width:100}]}>{item.name}</Text>
        </TouchableScale>
      </View>
    );
  }
}

export default withTheme(Item);
