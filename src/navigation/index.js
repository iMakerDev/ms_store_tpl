import * as React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Color, Images, Config, withTheme } from "@common";
import { TabBar, TabBarIcon, TabBarIconHome } from "@components";

import HomeScreen from "./HomeScreen";
import NewsScreen from "./NewsScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import DetailScreen from "./DetailScreen";
import CartScreen from "./CartScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import OrderDetailScreen from "./OrderDetailScreen";
import WishListScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./UserProfileScreen";
import FiltersScreen from "./FiltersScreen";
import AddressScreen from "./AddressScreen";
import AddAddressScreen from "./AddAddressScreen";
import ContactusScreen from "./ContactusScreen"
import MemberCenterScreen from "./MemberCenterScreen";
import MyCouponsScreen from "./MyCouponsScreen";

// import TransitionConfig from "./TransitionConfig";
import { getNavigationOptions } from "./utils";

import { ROUTER } from "./constants";

const { width } = Dimensions.get("window");

const CategoryNavigator = createStackNavigator();

const CategoryStack = withTheme(({ theme }) => {
  return (
    <CategoryNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CategoryNavigator.Screen
        name={ROUTER.CATEGORIES}
        component={CategoriesScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </CategoryNavigator.Navigator>
  );
});

const WishListNavigator = createStackNavigator();

const WishListStack = withTheme(({ theme }) => {
  return (
    <WishListNavigator.Navigator>
      <WishListNavigator.Screen
        name={ROUTER.WISHLIST}
        component={WishListScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </WishListNavigator.Navigator>
  );
});

const SearchNavigator = createStackNavigator();

const SearchStack = withTheme(({ theme }) => {
  return (
    <SearchNavigator.Navigator>
      <SearchNavigator.Screen
        name={ROUTER.SEARCH}
        component={SearchScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </SearchNavigator.Navigator>
  );
});

const HomeNavigator = createStackNavigator();

const HomeStack = withTheme(({ theme }) => {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        gesturesEnabled: true,
        // gestureResponseDistance: { horizontal: width / 2 },
        headerShown: false,
      }}>
      <HomeNavigator.Screen
        name={ROUTER.HOME}
        component={HomeScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </HomeNavigator.Navigator>
  );
});

const CartNavigator = createStackNavigator();

const CartScreenStack = withTheme(({ theme }) => {
  return (
    <CartNavigator.Navigator>
      <CartNavigator.Screen
        name={ROUTER.CART}
        component={CartScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </CartNavigator.Navigator>
  );
});

const UserProfileNavigator = createStackNavigator();

const UserProfileStack = withTheme(({ theme }) => {
  return (
    <UserProfileNavigator.Navigator>
      <UserProfileNavigator.Screen
        name={ROUTER.USER_PROFILE}
        component={UserProfileScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}

      />
    </UserProfileNavigator.Navigator>
  );
});

const MyOrderNavigator = createStackNavigator();

const MyOrderStack = withTheme(({ theme }) => {
  return (
    <MyOrderNavigator.Navigator>
      <MyOrderNavigator.Screen
        name={ROUTER.MY_ORDERS}
        component={MyOrdersScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
    </MyOrderNavigator.Navigator>
  );
});

const MainBottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainBottomTab.Navigator


      initialRouteNam={ROUTER.HOME_STACK}
      tabBar={(props) => <TabBar {...props} />}

      screenOptions={{ headerShown: false,tabBarIcon:true,lazy:true,activeTintColor: Color.primary,
        }}>
      <MainBottomTab.Screen
        name={ROUTER.HOME_STACK}
        component={HomeStack}
        options={({ navigation }) => {

          return {
            tabBarIcon: ({ tintColor }) => {
              return (
                <TabBarIconHome
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                  icon={Images.IconHome}
                  tintColor={tintColor}
                />
              );
            },
          };
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.CATEGORY_STACK}
        component={CategoryStack}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <TabBarIcon
              css={{ width: 18, height: 18 }}
              icon={Images.IconCategory}
              tintColor={tintColor}
            />
          ),
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.SEARCH_STACK}
        component={SearchStack}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <TabBarIcon
              css={{ width: 18, height: 18 }}
              icon={Images.IconSearch}
              tintColor={tintColor}
            />
          ),
        }}
      />
      {!Config.Affiliate.enable && (
        <MainBottomTab.Screen
          name={ROUTER.CART_STACK}
          component={CartScreenStack}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <TabBarIcon
                cartIcon
                css={{ width: 20, height: 20 }}
                icon={Images.IconCart}
                tintColor={tintColor}
              />
            ),
          }}
        />
      )}
      <MainBottomTab.Screen
        name={ROUTER.WISHLIST_STACK}
        component={WishListStack}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <TabBarIcon
              wishlistIcon
              css={{ width: 18, height: 18 }}
              icon={Images.IconHeart}
              tintColor={tintColor}
            />
          ),
        }}
      />
      <MainBottomTab.Screen
        name={ROUTER.USER_PROFILE_STACK}
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <TabBarIcon
              wishlistIcon
              css={{ width: 18, height: 18 }}
              icon={Images.IconUser}
              tintColor={tintColor}
            />
          ),
        }}
      />
      {!Config.Affiliate.enable && (
        <MainBottomTab.Screen
          name={ROUTER.MY_ORDERS_STACK}
          component={MyOrderStack}
          options={{
            tabBarIcon: ({ tintColor }) => (
              <TabBarIcon
                orderIcon
                css={{ width: 18, height: 18 }}
                icon={Images.IconOrder}
                tintColor={tintColor}
              />
            ),
          }}
        />
      )}
    </MainBottomTab.Navigator>
  );
};

const RootStack = createStackNavigator();

const RootNavigator = (props) => {
  return (
    <RootStack.Navigator {...props} screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name={ROUTER.APP}
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      {/* <RootStack.Screen name={ROUTER.AUTH} component={AuthNavigator} /> */}
    </RootStack.Navigator>
  );
};

const AppStack = createStackNavigator();

const AppNavigator = (parentProps) => {
  const { theme, ...rest } = parentProps;

  return (
    <AppStack.Navigator {...rest}>
      <AppStack.Screen
        name={ROUTER.ROOT}
        component={RootNavigator}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name={ROUTER.CUSTOM_PAGE}
        component={CustomPageScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.DETAIL}
        component={DetailScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.LOGIN}
        component={LoginScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.SIGN_UP}
        component={SignUpScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.NEWS}
        component={NewsScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.NEWS_DETAIL}
        component={NewsDetailScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.CATEGORY}
        component={CategoryScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.ORDER_DETAIL}
        component={OrderDetailScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.ADDRESS}
        component={AddressScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.ADD_ADDRESS}
        component={AddAddressScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.SETTINGS}
        component={SettingScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.LIST_ALL}
        component={ListAllScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />

      <AppStack.Screen
        name={ROUTER.FILTERS}
        component={FiltersScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.CONTACTUS}
        component={ContactusScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.MEMBERCENTER}
        component={MemberCenterScreen}
        options={(props) => {
          return getNavigationOptions({ ...props, theme });
        }}
      />
      <AppStack.Screen
        name={ROUTER.COUPONS}
        component={MyCouponsScreen}
        potions={props=>{
          return getNavigationOptions(...props,theme)
        }}
      />
    </AppStack.Navigator>
  );
};

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default AppNavigator;
