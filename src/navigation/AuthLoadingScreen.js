/** @format */

import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { ROUTER } from "./constants";

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { userInfo, navigation } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userInfo ? ROUTER.APP : ROUTER.AUTH, {
      screen: ROUTER.HOME,
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/NetInfoRedux");

  return {
    updateConnectionStatus: (isConnected) =>
      dispatch(actions.updateConnectionStatus(isConnected)),
  };
};

const mapStateToProps = (state) => ({
  userInfo: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
