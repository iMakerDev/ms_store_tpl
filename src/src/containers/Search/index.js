/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { Languages } from "@app/Omni";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import styles from "./styles";

class SearchScreen extends PureComponent {
  static propTypes = {
    onBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navi}>
          <TouchableOpacity style={styles.btnClose} onPress={this.props.onBack}>
            <EvilIcons name="close" size={30} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputSearch}
            placeholder={Languages.SearchPlaceHolder}
            placeholderTextColor="#cccccc"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishListItems: state.wishList.wishListItems,
    cartItems: state.carts.cartItems,
  };
};
export default connect(mapStateToProps)(SearchScreen);
