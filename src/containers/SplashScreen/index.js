/** @format */

import React, { PureComponent } from "react";
import { Image, StyleSheet, Platform, UIManager, View } from "react-native";
import { connect } from "react-redux";

import { Images, Device } from "@common";
import { Timer } from "@app/Omni";

const minDisplayTime = 1000;

class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    if (Platform.OS === "android") {
      // noinspection JSUnresolvedFunction
      UIManager.setLayoutAnimationEnabledExperimental(true); // enable Animation on Android
    }
  }

  componentDidMount() {
    Timer.setTimeout(this.prepareData, minDisplayTime);
  }

  /**
   * All necessary task like: pre-load data from server, checking local resource, configure settings,...
   * Should be done in this function and redirect to other screen when complete.
   */
  prepareData = () => {
    // noinspection Eslint
    const { netInfo } = this.props;
    if (netInfo.isConnected) {
      // Task that only work in online mode go here...
    } else {
      // Task that only work in offline mode go here...
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!Device.isAndroid && (
          <Image style={styles.image} source={Images.Logo} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
});

SplashScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user });
export default connect(mapStateToProps)(SplashScreen);
