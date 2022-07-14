/** @format */

import React, { PureComponent } from "react";

import { UserProfile } from "@containers";

class UserProfileScreen extends PureComponent {
  render() {
    const { navigation } = this.props;

    return <UserProfile navigation={navigation} />;
  }
}

export default UserProfileScreen;
