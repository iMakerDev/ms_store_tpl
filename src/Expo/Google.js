/** @format */

import React, { Component } from "react";
import { GoogleSignin } from "react-native-google-signin";

export default class Google {
  static logInAsync(options) {
    return GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        return GoogleSignin.configure(options).then(() =>
          GoogleSignin.signIn()
            .then((user) => {
              return { user, type: "success", idToken: user.idToken };
            })
            .catch((err) => console.log("error google signIn", err))
        );
      })
      .catch((err) =>
        console.log("Play services error", err.code, err.message)
      );
  }
}
