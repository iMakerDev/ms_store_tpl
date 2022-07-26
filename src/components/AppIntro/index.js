/** @format */

import React, { PureComponent } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, I18nManager } from "react-native";
import { LinearGradient } from "@expo";
import AppIntroSlider from "react-native-app-intro-slider";
import { connect } from "react-redux";

import { Config } from "@common";
import styles from "./styles";
/**
 * @api  {组件} ./src/components/AppIntro/index.js 引导页
 * @apiName Intro
 * @apiGroup 组件
 */
class AppIntro extends PureComponent {
  _renderItem = (props) => {
    const { item } = props;

    return (
      <LinearGradient
        style={[
          styles.mainContent,
          {
            paddingTop: props.topSpacer,
            paddingBottom: props.bottomSpacer,
            width: props.width,
            height: props.height,
          },
        ]}
        colors={item.colors}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}>
        <Ionicons
          style={{ backgroundColor: "transparent" }}
          name={item.icon}
          size={200}
          color="white"
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </LinearGradient>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name={I18nManager.isRTL ? "arrow-back-circle" : "arrow-forward-circle"}
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        data={Config.intro}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this.props.finishIntro}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");
  return {
    finishIntro: () => dispatch(actions.finishIntro()),
  };
};
export default connect(null, mapDispatchToProps)(AppIntro);
