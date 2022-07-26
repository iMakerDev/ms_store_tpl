/** @format */

import { Config } from "@common";
import DrawerDefault from "./DrawerDefault";
import DrawerMultiChild from "./DrawerMultiChild";

export default Config.menu.isMultiChild ? DrawerMultiChild : DrawerDefault;
