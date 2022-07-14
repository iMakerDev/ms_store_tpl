/** @format */

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import { AddressItem } from "@components";
import { withTheme } from "@common";

class Address extends PureComponent {
  render() {
    const { list, selectedAddress } = this.props;
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <FlatList
        overScrollMode="never"
        style={{ backgroundColor: background }}
        extraData={this.props}
        keyExtractor={(item, index) => `${index}`}
        data={list}
        renderItem={({ item, index }) => (
          <AddressItem
            onPress={() => this.selectAddress(item)}
            selected={_.isEqual(item, selectedAddress)}
            item={item}
            onRemove={() => this.removeAddress(index)}
          />
        )}
      />
    );
  }

  removeAddress = (index) => {
    this.props.removeAddress(index);
  };

  selectAddress = (item) => {
    this.props.selectAddress(item);
  };
}

Address.defaultProps = {
  list: [],
  selectedAddress: {},
};

const mapStateToProps = (state) => {
  return {
    list: state.addresses.list,
    reload: state.addresses.reload,
    selectedAddress: state.addresses.selectedAddress,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/AddressRedux");
  return {
    ...ownProps,
    ...stateProps,
    removeAddress: (index) => {
      actions.removeAddress(dispatch, index);
    },
    selectAddress: (address) => {
      actions.selectAddress(dispatch, address);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(Address));
