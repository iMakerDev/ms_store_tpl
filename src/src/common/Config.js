
/* eslint-disable */
/** @format */

import Images from "./Images";
import Constants from "./Constants";
import Icons from "./Icons";
const hostUrl = "https://www.poetic-house.com";

/**
 * @api  {公用} ./src/common/Config.js 项目配置
 * @apiName Config
 * @apiGroup 公用
 * @apiDescription 项目核心配置
 */
export default {
  /**
   * Step 1: 设置新项目的URL与WOO的密钥
   */
  WooCommerce: {
    url: hostUrl,
    consumerKey:"ck_04d50c88d3ab64d389c25338ca794a12859400ae",
    consumerSecret:"cs_eb37e60352d516797ff76c0d6e49653b7585721c",
  },

  /**
   Step 2: 设置缩略图模式，后台Menu->Tools：设置开启
   */
  ProductSize: {
    enable: false,
  },

  /**
   step 3:设置支付功能LOGO，可选部分
   * */
  Payments: {
    bacs: require("@images/payment_logo/bacs.png"),
    cheque:require("@images/payment_logo/checks.png"),
    cod: require("@images/payment_logo/cash_on_delivery.png"),
    paypal: require("@images/payment_logo/PayPal.png"),
    stripe_cc: require("@images/payment_logo/stripe.png"),
  },

  /**
   Step 4: 高级设置:
   - showShipping: 设置产品展示列表
   - showStatusBar: 是否展示状态栏，iPhoneX一直显示
   - LogoImage: 展示首页顶部LOGO
   - LogoWithText: 用户注册页面的LOGO
   - LogoLoading:全局加载的图标
   - appFacebookId:设置Facebook登录
   - CustomPages: 设置用户个人中心侧边栏菜单 (Components/Drawer/index.js)
   - WebPages:  设置自定义主页
   - intro: 设置引导页
   - menu: 配置侧边菜单 (isMultiChild: 是否展示子分类)
   * */
  shipping: {
    visible: true,
    zoneId: 1, // depend on your woocommerce
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: true,
  LogoImage: require("@images/Poetic_House_logo.png"),
  LogoWithText: require("@images/Poetic_House_logo.png"),
  LogoLoading: require("@images/logo.png"),

  showAdmobAds: false,
  AdMob: {
    deviceID: "__default",
    rewarded: "__default",
    interstitial: "__default",
    banner: "__default",
  },
  appFacebookId: "__default",
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: "" },
  //引导页面
  intro: [
    {
      key: "page1",
      title: "Welcome to Poetic house!",
      // text: "Get the hottest fashion by trend and season right on your pocket.",
      icon: "ios-basket",
      colors: ["#0FF0B3", "#036ED9"],
    },
    {
      key: "page2",
      title: "Secure Payment",
      text: "All your payment infomation is top safety and protected",
      icon: "ios-card",
      colors: ["#13f1fc", "#0470dc"],
    },
    {
      key: "page3",
      title: "High Performance",
      text: "Saving your value time and buy product with ease",
      icon: "ios-finger-print",
      colors: ["#b1ea4d", "#459522"],
    },
  ],

  /**
   * Config For Left Menu Side Drawer
   * @param goToScreen 3 Params (routeName, params, isReset = false)
   * BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
   */
  menu: {
    // has child categories
    isMultiChild: true,
    // Unlogged
    listMenuUnlogged: [
      {
        text: "Login",
        routeName: "LoginScreen",
        params: {
          isLogout: false,
        },
        icon: Icons.MaterialCommunityIcons.SignIn,
      },
    ],
    // user logged in
    listMenuLogged: [
      {
        text: "Logout",
        routeName: "LoginScreen",
        params: {
          isLogout: true,
        },
        icon: Icons.MaterialCommunityIcons.SignOut,
      },
    ],
    //个人中心侧边栏菜单列表
    listMenu: [
      {
        text: "Shop",
        routeName: "Home",
        icon: Icons.MaterialCommunityIcons.Home,
      },
      // {
      //   text: "News",
      //   routeName: "NewsScreen",
      //   icon: Icons.MaterialCommunityIcons.News,
      // },
      {
        text: "contactus",
        routeName: "CustomPage",
        params: {
          url: `${hostUrl}/contact-2/`
        },
        icon: Icons.MaterialCommunityIcons.Pin,
      },
      {
        text: "About",
        routeName: "CustomPage",
        params: {
          url: `${hostUrl}/rose_crown/`,
        },
        icon: Icons.MaterialCommunityIcons.Email,
      },
    ],
  },

  //个人中心下方功能列表
  ProfileSettings: [
    {
      label:"MemberCenter",
      routeName:"MemberCenter"
    },
    {
      label: "WishList",
      routeName: "WishListScreen",
    },
    {
      label: "MyOrder",
      routeName: "MyOrders",
    },
    {
      label: "Address",
      routeName: "Address",
    },
    {
      label: "Currency",
      isActionSheet: true,
    },
    // only support mstore pro
    {
      label: "Languages",
      routeName: "SettingScreen",
    },
    {
      label: "PushNotification",
    },
    {
      label: "DarkTheme",
    },
    {
      label: "contactus",
      routeName: "CustomPage",
      params: {
        url: `${hostUrl}/contact-2`,
      },
    },
    {
      label: "Privacy",
      routeName: "CustomPage",
      params: {
        url: `${hostUrl}/privacy`,
      },
    },
    {
      label: "termCondition",
      routeName: "CustomPage",
      params: {
        url: `${hostUrl}/refund_returns/`,
      },
    },
    {
      label: "About",
      routeName: "CustomPage",
      params: {
        url: `${hostUrl}/rose_crown/`,
      },
    },
  ],

  // 首页布局设置
  layouts: [
    {
      layout: Constants.Layout.card,
      image: Images.icons.iconCard,
      text: "cardView",
    },
    {
      layout: Constants.Layout.simple,
      image: Images.icons.iconRight,
      text: "simpleView",
    },
    {
      layout: Constants.Layout.twoColumn,
      image: Images.icons.iconColumn,
      text: "twoColumnView",
    },
    {
      layout: Constants.Layout.threeColumn,
      image: Images.icons.iconThree,
      text: "threeColumnView",
    },
    {
      layout: Constants.Layout.horizon,
      image: Images.icons.iconHorizal,
      text: "horizontal",
    },
    {
      layout: Constants.Layout.advance,
      image: Images.icons.iconAdvance,
      text: "advanceView",
    },
  ],

  // Default theme loading, this could able to change from the user profile (reserve feature)
  Theme: {
    isDark: false,
  },

  // new list category design
  CategoriesLayout: Constants.CategoriesLayout.card,

  // WARNING: Currently when you change DefaultCurrency, please uninstall your app and reinstall again. The redux saved store.
  DefaultCurrency: {
    symbol: "USD$",
    name: "US Dollar",
    code: "USD",
    name_plural: "US dollars",
    decimal: ".",
    thousand: ",",
    precision: 2,
    format: "%s%v", // %s is the symbol and %v is the value
  },

  DefaultCountry: {
    code: "en",
    RTL: false,
    language: "English",
    countryCode: "US",
    hideCountryList: false, // when this option is try we will hide the country list from the checkout page, default select by the above 'countryCode'
  },

  /**
   * Config notification onesignal, only effect for the Pro version
   */
  OneSignal: {
    appId: "43948a3d-da03-4e1a-aaf4-cb38f0d9ca51",
  },
  /**
   * Login required
   */
  Login: {
    RequiredLogin: false, // required before using the app
    AnonymousCheckout: false, // required before checkout or checkout anonymous
  },

  Layout: {
    HideHomeLogo: false,
    HideLayoutModal: false,
  },

  Affiliate: { enable: false },

  EnableOnePageCheckout: false,

  NativeOnePageCheckout: true,

  // using url from server to load AppConfig.json
  HomeCaching: {
    // url: `https://demo.mstore.io/wp-json/wc/v2/flutter/cache?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, // can change url to load another server
    enable: false, // disable load from server, and start load in local in `common/AppConfig.json`
  },

  // Stripe set up
  Stripe:{
    publishableKey:"pk_test_51KxCYwLPurHK71WaLLIpSmgZXNWeLGCSM7TCX70EddfZqTnZ1NNmljjm6quKIe9eOCebVVM0GwQXaHG7TgoRaPKB00KMrxnI3A",
  },
  iMarkerConfig:"IndexCat",
  iMarkerEctConfig:{
    addressConfig:{
      address:'荃湾青山道459-469号华力工业中心13楼M室',
      phone:'info@riseview.com.hk',
      email:'+852 3118 9338',
      detail:'暫不設門市，此地址只供客人預約試身',
    }
  }

};