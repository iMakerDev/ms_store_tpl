/** @format */

import * as React from "react";
import { Color, Images, Languages, Styles } from "@common";
import { ROUTER } from "./constants";
import {
  Back,
  CartWishListIcons,
  EmptyView,
  HeaderHomeRight,
  Logo,
  Menu,
  NavBarLogo,
  RightIcon,
} from "./IconNav";

export const getNavigationOptions = ({ route, navigation, theme }) => {
  let navigationOptions = {};

  switch (route.name) {
    case ROUTER.HOME: {
      navigationOptions = {
        headerTitle: (props) => <NavBarLogo {...props} route={route} />,
        headerLeft: (props) => <Menu {...props} dark={theme.dark} />,
        headerRight: (props) => <HeaderHomeRight {...props} />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.WISHLIST: {
      navigationOptions = {
        title: Languages.WishList,
        headerShown: false,
      };

      break;
    }

    case ROUTER.SEARCH: {
      navigationOptions = {
        title: Languages.Search,
        headerShown: false,
      };

      break;
    }

    case ROUTER.CART: {
      navigationOptions = {
        headerShown: false,
      };

      break;
    }

    case ROUTER.USER_PROFILE: {
      navigationOptions = {
        headerLeft: (props) => <Menu {...props} dark={theme.dark} />,

        title: Languages.UserProfile,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.MEMBERCENTER: {
      navigationOptions = {
        headerTitle: (props) => <NavBarLogo {...props} route={route} />,
        headerLeft: () => <Back navigation={navigation} dark={theme.dark} />,
        headerTintColor: Color.headerTintColor,
      }
      break
    }

    case ROUTER.MY_ORDERS: {
      navigationOptions = {
        headerShown: false,
      };

      break;
    }

    case ROUTER.CUSTOM_PAGE: {
      navigationOptions = {
        headerTitle: (props) => <NavBarLogo {...props} route={route} />,
        headerLeft: () => <Back navigation={navigation} dark={theme.dark} />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.DETAIL: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: (props) => (
          <CartWishListIcons {...props} navigation={navigation} />
        ),

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.LOGIN: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: (props) => <EmptyView {...props} />,

        title: Languages.Login,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.SIGN_UP: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: (props) => <EmptyView {...props} />,

        title: Languages.signup,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.NEWS: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => <Menu {...props} dark={theme.dark} />,
        headerRight: (props) => <EmptyView {...props} />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.NEWS_DETAIL: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),

        tabBarVisible: false,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.CATEGORY: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: (props) => <EmptyView {...props} />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.CATEGORIES: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => <Menu {...props} dark={theme.dark} />,
        headerRight: (props) => <EmptyView {...props} />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.ORDER_DETAIL: {
      navigationOptions = {
        headerTitle: (props) => <Logo {...props} />,
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),

        tabBarVisible: false,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.ADDRESS: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: () => (
          <RightIcon
            icon={Images.IconAdd}
            onPress={() => {
              navigation.navigate("AddAddress");
            }}
          />
        ),

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.ADD_ADDRESS: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),
        headerRight: () => <EmptyView />,

        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.SETTINGS: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back {...props} navigation={navigation} dark={theme.dark} />
        ),

        title: Languages.Settings,
        headerTintColor: Color.headerTintColor,
      };

      break;
    }

    case ROUTER.LIST_ALL: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back
            navigation={navigation}
            iconBack={Images.icons.backs}
            dark={theme.dark}
          />
        ),

        headerStyle: Styles.Common.toolbarFloat,
        headerTransparent: true,
        title: null,
      };

      break;
    }

    case ROUTER.FILTERS: {
      navigationOptions = {
        headerLeft: (props) => (
          <Back
            navigation={navigation}
            iconBack={Images.icons.backs}
            dark={theme.dark}
          />
        ),

        headerStyle: Styles.Common.toolbarFloat,
        headerTransparent: true,
        title: null,
      };

      break;
    }

    case ROUTER.COUPONS: {
      navigationOptions = {
        headerTitle: (props) => <NavBarLogo {...props} route={route} />,
        headerLeft: () => <Back navigation={navigation} dark={theme.dark} />,
        headerTintColor: Color.headerTintColor,
      }
      break
    }

    default: {
      navigationOptions = {};
    }
  }

  navigationOptions.headerStyle = {
    backgroundColor: theme.colors.background,
  };

  return navigationOptions;
};
