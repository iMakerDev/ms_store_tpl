/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Switch, Alert, I18nManager } from "react-native";
import { connect } from "react-redux";
import RNRestart from "react-native-restart";
import { Languages } from "@common";
import { Timer } from "@app/Omni";

export default class RtlSwitch extends PureComponent {
  static propTypes = {
    switchRtl: PropTypes.func,
    onTintColor: PropTypes.any,
    rtl: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { rtl: false };
  }

  componentDidMount() {
    Timer.setTimeout(() => this.setState({ rtl: this.props.rtl }), 2000);
  }

  changeSwitch = (value) => {
    this.setState({ rtl: value });
    const { switchRtl } = this.props;

    Alert.alert(Languages.Confirm, Languages.SwitchRtlConfirm, [
      {
        text: Languages.CANCEL,
        onPress: () => undefined,
      },
      {
        text: Languages.OK,
        onPress: async () => {
          await switchRtl(value);
          RNRestart.Restart();
        },
      },
    ]);
  };

  render() {
    const { onTintColor } = this.props;
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text>{Languages.changeRTL}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Switch
            onTintColor={onTintColor}
            onValueChange={this.changeSwitch}
            value={this.state.rtl}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ language }) => ({ rtl: language.rtl });

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/LangRedux");
  return {
    ...ownProps,
    ...stateProps,
    switchRtl: (rtl) => actions.switchRtl(dispatch, rtl),
  };
}

module.exports = connect(
  mapStateToProps,
  undefined,
  mergeProps
)(RtlSwitch);
