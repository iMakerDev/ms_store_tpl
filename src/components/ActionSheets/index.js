/** @format */

"use strict";

import React, { Component } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Modal,
  PixelRatio,
  ScrollView,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
const kDefaultItemHeight = 60;
const kDefaultAnimateDuration = 250;
const kDefault1Px = 1.0 / PixelRatio.get();
const kDefaultNotArrayTypeErrorDesc = "Prop `titles` must be an array.";
const kDefaultArrayIsEmptyErrorDesc =
  "Prop `titles` must be an array and it must not be empty.";

export default class ActionSheet extends Component {
  static propTypes = {
    titles: PropTypes.array.isRequired,
    defaultValue: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    separateHeight: PropTypes.number,
    separateColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    defaultTextStyle: Text.propTypes.style,
    activeTextStyle: Text.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    destructiveTextStyle: Text.propTypes.style,
    textViewStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    titles: [],
    separateHeight: 4,
    separateColor: "#dddddd",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    containerStyle: {},
  };

  constructor(props) {
    super(props);
    var defaultTitles = [],
      cancelTitles = [];
    for (var i = 0, length = props.titles.length; i < length; i++) {
      let title = props.titles[i];
      if (title.actionStyle == "cancel") {
        cancelTitles.push(title);
      } else {
        defaultTitles.push(title);
      }
    }
    this.state = {
      titles: props.titles,
      defaultTitles: defaultTitles,
      cancelTitles: cancelTitles,
      visible: false,
      scrollEnable: false,
      fadeAnim: new Animated.Value(0),
      containerHeight: 0,
      separateHeight: props.separateHeight,
      separateColor: props.separateColor,
      backgroundColor: props.backgroundColor,
      containerStyle: props.containerStyle,
      defaultTextStyle: props.defaultTextStyle,
      activeTextStyle: props.activeTextStyle,
      cancelTextStyle: props.cancelTextStyle,
      destructiveTextStyle: props.destructiveTextStyle,
      textViewStyle: props.textViewStyle,
      activeValue: false,
    };

    this.defaultActionStyles = {
      default: styles.defaultTextStyle,
      activeTextStyle: styles.activeTextStyle,
      cancel: styles.cancelTextStyle,
      destructive: styles.destructiveTextStyle,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.checkArrayStructure(nextProps.titles)) {
      var defaultTitles = [],
        cancelTitles = [];
      for (var i = 0, length = nextProps.titles.length; i < length; i++) {
        let title = nextProps.titles[i];
        if (title.actionStyle == "cancel") {
          cancelTitles.push(title);
        } else {
          defaultTitles.push(title);
        }
      }
      this._setContainerLayout(defaultTitles, cancelTitles);
      this.setState({
        titles: nextProps.titles,
        defaultTitles: defaultTitles,
        cancelTitles: cancelTitles,
        separateHeight: nextProps.separateHeight,
        separateColor: nextProps.separateColor,
        backgroundColor: nextProps.backgroundColor,
        containerStyle: nextProps.containerStyle,
        defaultTextStyle: nextProps.defaultTextStyle,
        cancelTextStyle: nextProps.cancelTextStyle,
        destructiveTextStyle: nextProps.destructiveTextStyle,
        textViewStyle: nextProps.textViewStyle,
      });

      if (nextProps.defaultTextStyle) {
        this.defaultActionStyles["default"] = nextProps.defaultTextStyle;
      }

      if (nextProps.cancelTextStyle) {
        this.defaultActionStyles["cancel"] = nextProps.cancelTextStyle;
      }

      if (nextProps.destructiveTextStyle) {
        this.defaultActionStyles["destructive"] =
          nextProps.destructiveTextStyle;
      }
    }
  }

  checkArrayStructure(array) {
    if (Object.prototype.toString.call(array) === "[object Array]") {
      if (array.length == 0) {
        throw Error(kDefaultArrayIsEmptyErrorDesc);
      } else {
        return true;
      }
    } else {
      throw Error(kDefaultNotArrayTypeErrorDesc);
    }
  }

  show = () => {
    this.setState({
      visible: true,
    });

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: kDefaultAnimateDuration,
      useNativeDriver: false,
    }).start();
  };

  hide = (title) => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: kDefaultAnimateDuration,
    }).start((event) => {
      this.setState({
        visible: false,
      });
    });

    if (title && !title.isCancel) {
      setTimeout(() => {
        this.props.onPress && this.props.onPress(title);
      }, 500);
    }
  };

  _setContainerLayout(
    defaultTitles = this.state.defaultTitles,
    cancelTitles = this.state.cancelTitles,
    maxHeight = height
  ) {
    let cancelHeight = 0;
    if (cancelTitles.length > 0) {
      cancelHeight =
        (cancelTitles.length - 1) * kDefault1Px + this.state.separateHeight;
    }
    let height =
      (defaultTitles.length + cancelTitles.length) * kDefaultItemHeight +
      (defaultTitles.length - 1) * kDefault1Px +
      cancelHeight;
    let maxContainerHeight = maxHeight - 2 * kDefaultItemHeight;

    this.setState({
      scrollEnable: height > maxContainerHeight,
      containerHeight:
        height > maxContainerHeight ? maxContainerHeight : height,
    });
  }

  _renderTitlesView = (titles) => {
    let content = [];
    const { defaultValue } = this.props;

    for (let i = 0, length = titles.length; i < length; i++) {
      let title = titles[i];
      let isDefault = defaultValue && defaultValue === title.title;
      let titleStyle = isDefault
        ? styles.activeTextStyle
        : this.defaultActionStyles[title.actionStyle];
      content.push(
        <TouchableOpacity
          key={"title" + i}
          onPress={() => {
            this.hide(title);
          }}
          style={[styles.item, this.state.textViewStyle, title.textViewStyle]}
          accessibilityLabel={title.accessibilityLabel}>
          <Text
            accessible={false}
            style={[styles.defaultTextStyle, titleStyle]}>
            {title.title}
          </Text>
        </TouchableOpacity>
      );
      if (i != length - 1) {
        content.push(
          <View
            key={"line" + i}
            style={[styles.line, { backgroundColor: this.state.separateColor }]}
          />
        );
      }
    }

    return content;
  };

  _renderDefaultTitles = () => {
    let content = this._renderTitlesView(this.state.defaultTitles);

    return (
      <ScrollView
        scrollEnabled={this.state.scrollEnable}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  };

  _renderCancelTitles = () => {
    let content = [];
    const { separateHeight, separateColor } = this.state;
    if (this.state.cancelTitles.length == 0) {
      return null;
    }
    content.push(
      <View
        key="separateLine"
        style={[
          styles.line,
          { height: separateHeight, backgroundColor: separateColor },
        ]}
      />
    );
    content.push(this._renderTitlesView(this.state.cancelTitles));

    return content;
  };

  render() {
    const {
      visible,
      fadeAnim,
      backgroundColor,
      defaultTitles,
      cancelTitles,
      separateColor,
      containerStyle,
      containerHeight,
    } = this.state;
    const supportedOrientations = [
      "portrait",
      "portrait-upside-down",
      "landscape",
      "landscape-left",
      "landscape-right",
    ];
    return (
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          console.log("close");
        }}
        animationType="none"
        onOrientationChange={(obj) => {}}
        supportedOrientations={supportedOrientations}>
        <Animated.View
          style={[
            styles.flex1,
            { opacity: fadeAnim, backgroundColor: backgroundColor },
          ]}
          onLayout={(event) => {
            this._setContainerLayout(
              defaultTitles,
              cancelTitles,
              event.nativeEvent.layout.height
            );
          }}>
          <TouchableOpacity
            onPress={() => {
              this.hide();
            }}
            activeOpacity={1}
            style={styles.flex1}></TouchableOpacity>

          <Animated.View
            style={[
              styles.container,
              { borderColor: separateColor },
              containerStyle,
              { height: containerHeight },
              {
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [containerHeight, 0],
                    }),
                  },
                ],
              },
            ]}>
            {this._renderDefaultTitles()}
            {this._renderCancelTitles()}
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }
}
