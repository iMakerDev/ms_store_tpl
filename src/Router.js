/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, I18nManager } from "react-native";
import { WooWorker } from "api-ecommerce";
import { ThemeProvider } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { Config, Device, Styles, Languages, Theme } from "@common";
import { MyToast, SplashScreen } from "@containers";
import { AppIntro, ModalReview } from "@components";
import Navigation, { navigationRef } from "@navigation";

import MenuSide from "@components/LeftMenu/MenuOverlay";
// import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';

import { toast, closeDrawer } from "./Omni";

class Router extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    introStatus: PropTypes.bool,
  };

  async componentDidMount() {
    const { language, updateConnectionStatus, fetchHomeLayouts } = this.props;

    // set default Language for App
    Languages.setLanguage(language.lang);
    // Enable for mode RTL
    I18nManager.forceRTL(language.lang === "ar");

    // init wooworker
    WooWorker.init({
      url: Config.WooCommerce.url,
      consumerKey: Config.WooCommerce.consumerKey,
      consumerSecret: Config.WooCommerce.consumerSecret,
      wp_api: true,
      version: "wc/v3",
      queryStringAuth: true,
      language: language.lang,
    });

    // initial json file from server or local
    await fetchHomeLayouts(Config.HomeCaching.url, Config.HomeCaching.enable);

    const netInfo = await NetInfo.fetch();

    updateConnectionStatus(netInfo.type !== "none");

    this.setState({ loading: false });
  }

  goToScreen = (routeName, params) => {
    if (!navigationRef?.current) {
      return toast("Cannot navigate");
    }

    // fix the navigation for Custom page
    if (routeName) {
      navigationRef?.current?.navigate(routeName, params);
    }

    closeDrawer();
  };

  render() {
    const { loading } = this.state;
    const { isDarkTheme, introStatus, navigation, initializing } = this.props;

    if (!introStatus) {
      return <AppIntro />;
    }

    if (loading || initializing) {
      return <SplashScreen navigation={navigation} />;
    }

    // get theme based on dark or light mode
    const theme = isDarkTheme ? Theme.dark : Theme.light;

    return (
      <ThemeProvider theme={theme}>
        <MenuSide
          goToScreen={this.goToScreen}
          routes={
            <View
              style={[
                Styles.app,
                { backgroundColor: theme.colors.background },
              ]}>
              <StatusBar
                barStyle={isDarkTheme ? "light-content" : "dark-content"}
                animated
                hidden={Device.isIphoneX ? false : !Config.showStatusBar}
              />
              <MyToast />

              <NavigationContainer ref={navigationRef}>
                <Navigation theme={theme} />
              </NavigationContainer>

              <ModalReview />
            </View>
          }
        />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  introStatus: state.user.finishIntro,
  userInfo: state.user.user,
  language: state.language,
  netInfo: state.netInfo,
  isDarkTheme: state.app.isDarkTheme,
  rtl: state.language.rtl,

  initializing: state.layouts.initializing,
});

const mapDispatchToProps = (dispatch) => {
  const NetInfoRedux = require("@redux/NetInfoRedux");
  const LayoutRedux = require("@redux/LayoutRedux");

  return {
    updateConnectionStatus: (isConnected) => {
      dispatch(NetInfoRedux.actions.updateConnectionStatus(isConnected));
    },
    fetchHomeLayouts: (url, enable) => {
      dispatch(LayoutRedux.actions.fetchHomeLayouts(url, enable));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
