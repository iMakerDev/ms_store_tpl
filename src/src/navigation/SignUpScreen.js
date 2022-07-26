/** @format */

import React, { Component } from "react";

import { SignUp } from "@containers";

// eslint-disable-next-line react/prefer-stateless-function
class SignUpScreen extends Component {
  render() {
    const { navigation, route } = this.props;

    return (
      <SignUp
        params={route.params}
        onBackCart={() => navigation.navigate("Cart")}
      />
    );
  }
}

export default SignUpScreen;
