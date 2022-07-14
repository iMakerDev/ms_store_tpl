/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? (height * 2.7174) / 100 : StatusBar.currentHeight;

class PickerBox extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      })
    ).isRequired,
    onValueChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.number,
    statusbar: PropTypes.bool,
    itemTextColor: PropTypes.string,
    separatorColor: PropTypes.string,
    prevTextColor: PropTypes.string,
    prevTextLabel: PropTypes.string,
  };

  static defaultProps = {
    selectedValue: undefined,
    maxHeight: (height * 29.8913) / 100,
    statusbar: true,
    itemTextColor: "#757379",
    separatorColor: "#757379",
    prevTextColor: "#572580",
    prevTextLabel: "Cancel",
  };

  constructor(props) {
    super(props);

    this.maxHeight = props.maxHeight;

    this.state = {
      visible: false,
      verticalPos: new Animated.Value(-this.maxHeight),
      selectedValue: props.selectedValue,
    };
  }

  componentDidMount() {
    this.props.data.map((item) => {
      if (this.state.selectedValue === item.value) {
        this._onValueChange(item);
      }
    });
  }

  componentDidUpdate(prevProps, nextState) {
    nextState.visible !== this.state.visible && this._animatePicker();
  }

  _onValueChange = (item) => {
    this.setState({
      selectedValue: item.value,
    });

    this.props.onValueChange(item.value);

    this._closePicker();
  };

  openPicker = () => {
    this.state.visible ? this._closePicker() : this.setState({ visible: true });
  };

  _closePicker = () => {
    this.state.visible && this.setState({ visible: false });
  };

  _animatePicker = () => {
    const initialValue = this.state.visible ? -this.height : 0,
      finalValue = this.state.visible ? 0 : -this.height;

    this.state.verticalPos.setValue(initialValue);

    Animated.spring(this.state.verticalPos, {
      toValue: finalValue,
      friction: Platform.OS === "ios" ? 9 : 8,
    }).start();
  };

  _renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.boxItem}
        onPress={(_) => {
          this._onValueChange(item);
        }}>
        <Text
          style={[
            styles.text,
            styles.textItem,
            { color: this.props.itemTextColor },
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
      {index !== this.props.data.length - 1 && (
        <View
          style={[styles.separator, { borderColor: this.props.separatorColor }]}
        />
      )}
    </View>
  );

  _touchClose = () => (
    <TouchableOpacity
      style={{
        width,
        height:
          height - (this.props.statusbar ? STATUSBAR_HEIGHT : 0) - this.height,
      }}
      activeOpacity={1}
      onPress={this._closePicker}
    />
  );

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.visible &&
            (this.props.statusbar
              ? styles.containerVisibleStatusBar
              : styles.containerVisible),
        ]}>
        {this.state.visible && this._touchClose()}
        <Animated.View
          onLayout={(e) => (this.height = e.nativeEvent.layout.height)}
          style={[
            styles.picker,
            { maxHeight: this.maxHeight },
            { bottom: this.state.verticalPos },
          ]}>
          <FlatList
            bounces={false}
            style={styles.flat}
            contentContainerStyle={styles.contentFlat}
            data={this.props.data}
            keyExtractor={(item, index) => index + ""}
            renderItem={this._renderItem}
          />
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={this._closePicker}>
            <Text style={[styles.text, { color: this.props.prevTextColor }]}>
              {this.props.prevTextLabel}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    bottom: -height,
    zIndex: 999,
  },
  containerVisible: {
    height: height,
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "absolute",
    bottom: 0,
  },
  containerVisibleStatusBar: {
    height: height - STATUSBAR_HEIGHT,
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "relative",
    bottom: 0,
  },
  picker: {
    width,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: (width * 1.2077) / 100,
    paddingBottom: (height * 0.6793) / 100,
    position: "absolute",
  },
  flat: {
    width: "100%",
    marginVertical: (height * 0.6793) / 100,
    marginHorizontal: (width * 1.2077) / 100,
  },
  contentFlat: {
    alignItems: "center",
  },
  btnVoltar: {
    width: "100%",
    height: (height * 4.0761) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: (width * 3.8647) / 100,
    lineHeight: (height * 2.7174) / 100,
  },
  boxItem: {
    width: (width * 84.5411) / 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: (height * 2.038) / 100,
  },
  textItem: {
    fontSize: (width * 4.3478) / 100,
  },
  separator: {
    width: "100%",
    borderWidth: (width * 0.1208) / 100,
  },
});

export default PickerBox;
