/** @format */

import React from "react";
import { View, Dimensions, Animated } from "react-native";
const { width } = Dimensions.get("window");

class Item extends React.PureComponent {
  state = {
    widthAnimation: new Animated.Value(0),
  };
  widthItem = 50;

  onLayout = (e) => {
    this.widthItem = e.nativeEvent.layout.width;
    if (this.props.active) {
      Animated.timing(this.state.widthAnimation, {
        toValue: this.widthItem,
        duration: 6000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          this.props.onNext();
        }
      });
    }
  };

  render() {
    const { totalItems } = this.props;
    return (
      <View
        style={[styles.container, { flex: totalItems }]}
        onLayout={this.onLayout}>
        <Animated.View
          style={[styles.active, { width: this.state.widthAnimation }]}
        />
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active != nextProps.active) {
      if (nextProps.active) {
        this.state.widthAnimation.setValue(0);
        Animated.timing(this.state.widthAnimation, {
          toValue: this.widthItem,
          duration: 6000,
        }).start(({ finished }) => {
          if (finished) {
            this.props.onNext();
          }
        });
      } else {
        this.state.widthAnimation.setValue(this.widthItem);
        this.state.widthAnimation.stopAnimation();
      }
    }

    if (nextProps.isReset && !nextProps.active) {
      this.state.widthAnimation.setValue(0);
    }
  }
}

const styles = {
  container: {
    height: 2,
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0, 0.2)",
    marginRight: 5,
    flexDirection: "row",
  },
  active: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
};

export default Item;
