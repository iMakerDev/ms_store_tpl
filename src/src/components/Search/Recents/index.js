/** @format */

import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Icons, Languages, withTheme } from "@common";
import { Chips } from "@components";
import ExpandComponent from "../../ExpandComponent";
import styles from "./style";

class Recents extends React.Component {
  state = {
    expanded: true,
  };

  render() {
    const {
      histories,
      onClear,
      onSearch,
      searchText,
      theme: {
        dark: isDark,
        colors: { text },
      },
    } = this.props;
    const { expanded } = this.state;

    if (histories.length == 0) {
      return <View />;
    }

    return (
      <ExpandComponent
        ref="expandComponent"
        contentView={
          <View style={styles.container}>
            <TouchableOpacity onPress={this.toggle} style={styles.recents}>
              <Text style={[styles.text, { color: text }]}>
                {Languages.Recents}
              </Text>
              <Icon
                name={
                  expanded
                    ? Icons.Ionicons.DownArrow
                    : Icons.Ionicons.RightArrow
                }
                size={20}
                color={isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClear}>
              <Image
                source={require("@images/ic_trash.png")}
                style={[styles.icon, isDark && { tintColor: "#fff" }]}
              />
            </TouchableOpacity>
          </View>
        }
        expandView={
          <Chips
            items={histories}
            selectedItem={searchText}
            onPress={onSearch}
          />
        }
        onChangeStatus={this.onChangeStatus}
      />
    );
  }

  onChangeStatus = (expanded) => {
    this.setState({ expanded });
  };

  toggle = () => {
    this.refs.expandComponent.toggle();
  };
}

export default withTheme(Recents);
