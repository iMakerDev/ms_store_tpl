/** @format */

import React from "react";
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  I18nManager,
  Animated,
  Text,
} from "react-native";
import { Styles, Events, Images, Config } from "@common";
import { NavigationBarIcon, CartIcons } from "@components";
import { toggleDrawer } from "@app/Omni";

const NavBarLogo = ({ route }) => {
  const scrollAnimation =
    route?.params?.animatedHeader || new Animated.Value(1);

  return (
    <Animated.Image
      source={Config.LogoImage}
      style={[Styles.Common.logo, { opacity: scrollAnimation }]}
    />
  );
};

const NavBarText = ({ route, text }) => {
  const scrollAnimation =
    route?.params?.animatedHeader || new Animated.Value(1);

  return (
    <Animated.Text
      style={[Styles.Common.headerText, { opacity: scrollAnimation }]}>
      {text}
    </Animated.Text>
  );
};

// Icons for HeaderBar
const Logo = () => (
  <Image source={Config.LogoImage} style={Styles.Common.logo} />
);

const hitSlop = { top: 20, right: 20, bottom: 0, left: 20 };
const Menu = ({ dark }) => (
  <TouchableOpacity hitSlop={hitSlop} onPress={toggleDrawer}>
    <Image
      source={Images.icons.home}
      style={[
        Styles.Common.toolbarIcon,
        dark && { tintColor: "#fff" },
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

const EmptyView = () => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}
  />
);

const HeaderRight = (navigation) => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    <NavigationBarIcon
      icon={Images.IconSearch}
      size={17}
      onPress={() => navigation.navigate("Search")}
    />
  </View>
);

const HeaderHomeRight = () => (
  <View style={[Styles.Common.Row, Platform.OS !== "ios" && { right: -12 }]}>
    {!Config.Layout.HideLayoutModal && (
      <NavigationBarIcon
        icon={Images.IconGrid}
        size={17}
        onPress={Events.openModalLayout}
      />
    )}
  </View>
);

const CartWishListIcons = ({ navigation }) => (
  <CartIcons navigation={navigation} />
);

const Back = ({ navigation, iconBack, dark }) => (
  <TouchableOpacity
    style={Styles.Common.viewBack}
    hitSlop={hitSlop}
    onPress={() => {
      navigation.goBack(null);
    }}>
    <Image
      source={iconBack || Images.icons.back}
      style={[
        Styles.Common.toolbarIconBack,
        iconBack && Styles.Common.iconBack,
        dark && { tintColor: "#fff" },
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

const RightIcon = ({ icon, onPress }) => (
  <View style={[Styles.Common.Row]}>
    <NavigationBarIcon icon={icon} size={24} onPress={onPress} />
  </View>
);

const Title = ({ title, textColor }) => (
  <View>
    <Text style={[Styles.Common.headerTitleStyle, { color: textColor }]}>
      {title}
    </Text>
  </View>
);

export {
  Logo,
  Menu,
  HeaderRight,
  EmptyView,
  CartWishListIcons,
  HeaderHomeRight,
  Back,
  NavBarLogo,
  RightIcon,
  NavBarText,
  Title,
};
