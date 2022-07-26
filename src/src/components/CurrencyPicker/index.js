/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { RadioButtons } from "react-native-radio-buttons";
import CurrencyWorker from "@services/CurrencyWorker";
import _ from "lodash";
import { Color, Languages, withTheme } from "@common";

import styles from "./styles";

const { width } = Dimensions.get("window");

@withTheme
class CurrencyPicker extends PureComponent {
  static propTypes = {
    changeCurrency: PropTypes.func.isRequired,
    currency: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  _changeCurrency = (selectedOption) => {
    this.props.changeCurrency(selectedOption);
  };

  _renderOptions = (option, selected, onSelect, index) => {
    const {
      theme: {
        colors: { text, background },
      },
    } = this.props;
    const isLastOption = index === CurrencyWorker.length - 1;
    return (
      <TouchableOpacity
        onPress={onSelect}
        key={index}
        style={{
          padding: 10,
          backgroundColor: background,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginBottom: isLastOption ? 200 : 0,
        }}>
        <Text style={styles.text(text)}>{option.code}</Text>
        <Text style={[styles.text(text), !selected && { fontWeight: "100" }]}>({option.name})</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      currency,
      theme: {
        colors: { text, background },
      },
    } = this.props;

    const selectedIndex =
      currency &&
      _.findIndex(CurrencyWorker, (o) => {
        return o.code === currency.code;
      });

    return (
      <View>
        <Text style={styles.title(text)}>{Languages.SelectCurrency}</Text>
        <RadioButtons
          options={CurrencyWorker}
          onSelection={this._changeCurrency}
          selectedIndex={selectedIndex}
          renderOption={this._renderOptions}
          renderContainer={(optionNodes) => (
            <ScrollView
              style={{
                height: null,
                width: width - 20,
                backgroundColor: background,
              }}>
              {optionNodes}
            </ScrollView>
          )}
        />
      </View>
    );
  }
}

export default CurrencyPicker;
