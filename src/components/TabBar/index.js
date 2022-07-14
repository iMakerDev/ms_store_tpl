/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

import { Device, withTheme } from "@common";
import { ROUTER } from "@app/navigation/constants";

const styles = StyleSheet.create({
  tabbar: {
    height: Device.isIphoneX ? 60 : 49,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  tab: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    ...Platform.select({
      ios: {
        justifyContent: Device.isIphoneX ? "flex-start" : "center",
        paddingTop: Device.isIphoneX ? 12 : 0,
      },
      android: {
        justifyContent: "center",
      },
    }),
  },
});

class TabBar extends PureComponent {
  onPress = (index, route) => {
    const { navigation } = this.props;

    this.refs[`tabItem${index}`].flipInY(900);

    // back to main screen when is staying child route

    navigation.jumpTo(route.name);
  };

  render() {
    const {
      state,
      descriptors,
      activeTintColor,
      inactiveTintColor,
      theme: {
        colors: { background },
      },
      user,
    } = this.props;

    const { routes } = state;

    const ignoreScreen = [
      "DetailScreen",
      "SearchScreen",
      "NewsScreen",
      "LoginScreen",
      "SignUpScreen",
      "CustomPage",
      "CategoryDetail",
      "SettingScreen",
      "WishListScreen",
      "LoginStack",
    ];

    return (
      <View
        style={[
          styles.tabbar,
          { backgroundColor: background, borderTopColor: background },
        ]}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === state.index;
            const tintColor = focused ? activeTintColor : inactiveTintColor;

            if (ignoreScreen.indexOf(route.name) > -1) {
              return <View key={route.key} />;
            }

            if (user === null && route.name === ROUTER.MY_ORDERS_STACK) {
              return <View key={route.key} />;
            }

            const tabOptions = descriptors[route.key]?.options;

            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles.tab}
                onPress={() => this.onPress(index, route)}>
                <Animatable.View ref={`tabItem${index}`} style={styles.tab}>
                  {tabOptions?.tabBarIcon &&
                    tabOptions.tabBarIcon({ route, index, focused, tintColor })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  }
}

TabBar.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
};
const mapStateToProps = ({ user }) => ({ user: user.user });
export default withTheme(connect(mapStateToProps)(TabBar));
