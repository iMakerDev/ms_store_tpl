/** @format */

import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
/**
 * @api  {公用} ./src/common/Device.js 特定设备配置
 * @apiName Device
 * @apiGroup 公用
 * @apiDescription 特定设备配置
 */
const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height >= 812 || width >= 812);

export default {
  isIphoneX,
  ToolbarHeight: isIphoneX ? 35 : 0,
  isAndroid: Platform.OS === "android",
};
