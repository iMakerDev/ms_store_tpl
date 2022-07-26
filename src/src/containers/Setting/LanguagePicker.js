/**
 * Created by Luan on 11/23/2016.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, I18nManager, Image } from "react-native";
import { connect } from "react-redux";
import RNRestart from "react-native-restart";
import { RadioButtons } from "react-native-radio-buttons";

import { Languages, Images, withTheme } from "@common";
import { Button } from "@components";
import styles from "./styles";

@withTheme
class LanguagePicker extends PureComponent {
  static propTypes = {
    language: PropTypes.object,
    switchLanguage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.language.lang,
      isLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language.lang !== nextProps.language.lang) {
      // Enable for mode RTL
      setTimeout(() => {
        RNRestart.Restart();
      }, 2000);
    }
  }

  _handlePress = () => {
    const { switchLanguage, switchRtl, language } = this.props;
    const { selectedOption } = this.state;
    if (selectedOption !== language.lang) {
      const isRtl = selectedOption === "ar";

      this.setState({ isLoading: true });

      // change RTL
      I18nManager.forceRTL(isRtl);
      switchLanguage({
        lang: selectedOption,
        rtl: isRtl,
      });
    }
  };

  render() {
    const {
      theme: {
        colors: { background, text, lineColor },
      },
      language
    } = this.props;

    const renderOption = (option, selected, onSelect, index) => {
      let icon = null;
      let name = null;

      switch (option) {
        case "cn":
          icon = Images.ICONCNFlag
          name = "中文简体"
          break
        case "en":
          icon = Images.IconUkFlag;
          name = "English";
          break;
        default:
          icon = Images.ICONCNFlag
          name = "中文繁体"
      }

      return (
        <TouchableOpacity
          onPress={onSelect}
          key={index}
          style={{
            padding: 10,
            backgroundColor: selected ? lineColor : background,
            flexDirection: "row",
            alignItems: "center",
            width: undefined,
          }}>
          {/* <Icon name={selected ? Icons.Ionicons.RatioOn : Icons.Ionicons.RatioOff} size={15}/> */}
          <Image source={icon} style={styles.icon} />
          <Text
            style={[
              selected
                ? { fontWeight: "bold", marginLeft: 10 }
                : { marginLeft: 10 },
              { color: text },
            ]}>
            {name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <RadioButtons
          options={Languages.getAvailableLanguages()}
          onSelection={(selectedOption) => this.setState({ selectedOption })}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={(optionNodes) => (
            <View style={{ margin: 10 }}>{optionNodes}</View>
          )}
        />
        <View style={styles.buttonContainer}>
          <Button
            text={Languages.SwitchLanguage}
            style={styles.button}
            textStyle={styles.buttonText}
            isLoading={this.state.isLoading}
            onPress={this._handlePress}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ language: state.language });

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/LangRedux");
  return {
    ...ownProps,
    ...stateProps,
    switchLanguage: (language) => actions.switchLanguage(dispatch, language),
    switchRtl: (rtl) => actions.switchRtl(dispatch, rtl),
  };
}

module.exports = connect(
  mapStateToProps,
  undefined,
  mergeProps
)(LanguagePicker);
