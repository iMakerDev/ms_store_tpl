/** @format */

"use strict";
import React, { Component } from "react";
import { View ,TouchableHighlight,Text} from "react-native";
import styles from "./styles";
import { Button } from "@components";
import { Languages } from "@common";

export default class ShopButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight underlayColor={'#59d2ce'} onPress={this.props.onPress} style={[{paddingVertical:10,paddingHorizontal:25,backgroundColor:'#3FC1BE',borderRadius:20},this.props.css]}>
          <Text  style={[ styles.buttonText,{color:'#fff',textAlign:'center'}]}>
            {this.props.text ? this.props.text : Languages.ShopNow}
          </Text>
          {/*<Button*/}
          {/*  text={this.props.text ? this.props.text : Languages.ShopNow}*/}
          {/*  style={[styles.button, this.props.css]}*/}
          {/*  textStyle={styles.buttonText}*/}
          {/*  onPress={this.props.onPress}*/}
          {/*/>*/}
        </TouchableHighlight>
      </View>
    );
  }
}
