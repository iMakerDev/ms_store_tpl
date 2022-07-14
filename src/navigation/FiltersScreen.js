/** @format */

import React, { PureComponent } from "react";

import { Filters } from "@containers";

class FiltersScreen extends PureComponent {
  render() {
    const { navigation, route } = this.props;

    return (
      <Filters
        navigation={navigation}
        route={route}
        onBack={() => navigation.goBack()}
      />
    );
  }
}

export default FiltersScreen;
