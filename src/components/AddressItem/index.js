/** @format */

import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import { Images, withTheme } from "@common";

import styles from "./style";

const getCountryNameByCode = (country, countries) => {
  const currentCountry = countries[country];

  return currentCountry || country;
};

// eslint-disable-next-line react/prefer-stateless-function
class Item extends React.PureComponent {
  render() {
    const { item, onPress, selected, onRemove, countries } = this.props;

    let address = "";
    if (item.address_1 !== "") {
      address += `${item.address_1}, `;
    }

    if (item.city !== "") {
      address += `${item.city}, `;
    }

    if (item.state !== "") {
      address += `${item.state}, `;
    }

    if (item.country !== "") {
      address += getCountryNameByCode(item.country, countries);
    }

    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: background }]}
        activeOpacity={0.85}
        onPress={onPress}>
        <View style={styles.content}>
          <Text style={[styles.name, { color: text }]}>
            {`${item.first_name} ${item.last_name}`}
          </Text>
          <Text style={[styles.text, { color: text }]}>{item.email}</Text>
          <Text style={[styles.text, { color: text }]}>{item.phone}</Text>
          <Text style={[styles.text, { color: text }]}>{item.postcode}</Text>
          <Text style={[styles.text, { color: text }]}>{address}</Text>
        </View>
        <View style={styles.buttons}>
          {selected && (
            <Image
              source={Images.IconCheck}
              style={[styles.icon, { tintColor: "green" }]}
            />
          )}
          {!selected && <View />}
          {!selected && (
            <TouchableOpacity onPress={onRemove}>
              <Image
                source={require("@images/ic_trash.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries.list,
  };
};

export default withTheme(connect(mapStateToProps)(Item));
