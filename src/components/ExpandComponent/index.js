/**
 * @format
 */

import * as React from "react";
import { View, Animated } from "react-native";
import PropTypes from "prop-types";

class ExpandComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      minHeight: 0,
      maxHeight: 0,
    };
    this.expanded = true;
  }

  static defaultProps = {
    onChangeStatus: () => {},
  };

  render() {
    const { contentView, expandView } = this.props;
    const { animation, minHeight, maxHeight } = this.state;
    const opacity = animation.interpolate({
      inputRange: [minHeight, minHeight + maxHeight],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={{ height: animation }}>
        <View onLayout={(e) => this.setMinHeight(e)} style={{ minHeight: 1 }}>
          {contentView}
        </View>
        {minHeight > 0 && (
          <Animated.View
            onLayout={(e) => this.setMaxHeight(e)}
            style={{ opacity }}>
            {expandView}
          </Animated.View>
        )}
      </Animated.View>
    );
  }

  setMaxHeight = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    if (height > 0) {
      this.setState({ maxHeight: height });
      if (this.expanded) {
        this.setState({
          animation: new Animated.Value(this.state.minHeight + height),
        });
      }
    }
  };

  setMinHeight = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    this.setState({
      minHeight: height,
    });
    if (this.expanded) {
      this.setState({
        animation: new Animated.Value((this.state.minHeight + height) * 1.1),
      });
    }
  };

  toggle = () => {
    const { maxHeight, minHeight } = this.state;
    const finalValue = this.expanded ? minHeight : maxHeight + minHeight;
    this.expanded = !this.expanded;
    this.props.onChangeStatus(this.expanded);
    Animated.timing(this.state.animation, {
      toValue: finalValue,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
}

ExpandComponent.propTypes = {
  contentView: PropTypes.element,
  expandView: PropTypes.element,
};

export default ExpandComponent;
