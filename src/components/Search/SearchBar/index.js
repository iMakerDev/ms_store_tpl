/** @format */

import React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/Ionicons";
import { Icons, Languages, Color, withTheme,Images } from "@common";

@withTheme
class SearchBar extends React.Component {
  render() {
    let {
      autoFocus,
      value,
      onChangeText,
      onSubmitEditing,
      scrollY,
      onClear,
      onFilter,
      isShowFilter,
      haveFilter,
    } = this.props;

    const {
      theme: {
        colors: {text, lineColor },
      },
    } = this.props;

    const transformY = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            // transform: [{ translateY: transformY }],
          },
          { backgroundColor: lineColor },
        ]}>
        <Image source={Images.IconSearch} style={styles.iconStyle}/>
        <TextInput
          placeholder={Languages.SearchPlaceHolder}
          placeholderTextColor={text}
          style={[styles.input, {color: text} ]}
          underlineColorAndroid="transparent"
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Image
              source={require("@images/ic_clear_search.png")}
              style={[styles.icon, { tintColor: text }]}
            />
          </TouchableOpacity>
        )}


          <View style={[styles.separator, { tintColor: text }]} />

          <TouchableOpacity onPress={onFilter}>
            <Image
              source={require("@images/ic_filter_search.png")}
              style={[
                styles.icon,
                { tintColor: haveFilter ? Color.primary : text },
              ]}
            />
          </TouchableOpacity>

      </Animated.View>
    );
  }
}

export default SearchBar;
