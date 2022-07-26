/** @format */

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
/**
 * @api  {公用} ./src/common/Constants.js 项目常量配置
 * @apiName Constants
 * @apiGroup 公用
 * @apiDescription 项目常量配置
 */
const Constants = {
  RTL: false, // default to set redux. Only use first time
  useReactotron: true,

  Language: "en", // ar, en. Default to set redux. Only use first time
  fontFamily: "OpenSans",
  fontHeader: "Baloo",
  fontHeaderAndroid: "Baloo",
  WordPress: {
    defaultDateFormat: "YYYY-MM-DD HH:mm:ss",
    checkout: "mstore-checkout",
  },
  SplashScreen: {
    Duration: 2000,
  },
  AsyncCode: {
    Intro: "async.intro",
  },
  EmitCode: {
    SideMenuOpen: "OPEN_SIDE_MENU",
    SideMenuClose: "CLOSE_SIDE_MENU",
    SideMenuToggle: "TOGGLE_SIDE_MENU",
    Toast: "toast",
    MenuReload: "menu.reload",
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get("window").width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get("window").height * percent;
    },
  },
  LimitAddToCart: 100,
  TagIdForProductsInMainCategory: 263,
  Window: {
    width,
    height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },

  PostImage: {
    small: "small",
    medium: "medium",
    medium_large: "medium_large",
    large: "large",
  },
  tagIdBanner: 273, // cat ID for Sticky Products
  stickyPost: true, // default is true (else false)
  PostList: {
    // Custom get All Products in Home Screen
    order: "desc", // or asc - default is "desc" column
    orderby: "date", // date, id, title and slug - default is "date" column
  },
  Layout: {
    card: "card",
    twoColumn: "twoColumn",
    simple: "simple",
    list: "list",
    advance: "advance",
    threeColumn: "threeColumn",
    horizon: "horizon",
    twoColumnHigh: "twoColumnHigh",
    BannerLarge: "bannerLarge",
    Banner: "banner",
    BannerSale: "bannerSale",
    Blog: "Blog",

    circleCategory: "circleCategory",
    BannerHigh: "bannerHigh",
    BannerSlider: "bannerSlider",
    BannerImage: "bannerImage",
  },
  pagingLimit: 10,

  fontText: {
    size: 16,
  },
  productAttributeColor: "color",

  CategoriesLayout: {
    card: "card",
    sideMenu: "side-menu",
    column: "column",
    topMenu: "top-menu",
  },

  AppleData: "@appleData",

  ProductType: {
    simple: "simple",
    external: "external", // affiliate
    variable: "variable",
  },

  Languages: {
    en: "en",
    ar: "ar",
    cn:"cn",
    tc:"tc"
  },
};

export default Constants;
