/** @format */

import React, { PureComponent } from "react";

import { Login } from "@containers";

class LoginScreen extends PureComponent {
  render() {
    const { route, navigation } = this.props;
    const { navigate, goBack } = navigation;
    const isLogout = route.params ? route.params.isLogout : false;

    return (
      <Login
        statusBar
        route={route}
        navigation={navigation}
        onBack={goBack}
        isLogout={isLogout}
        onViewSignUp={(user) => navigate("SignUpScreen", user)}
        onViewCartScreen={() => navigate("CartScreen")}
        onViewHomeScreen={() => navigate("Default")}
      />
    );
  }
}

export default LoginScreen;
