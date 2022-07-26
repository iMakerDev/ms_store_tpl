/** @format */

import WPAPI from "wpapi";
import { Config } from "@common";

const wpAPI = new WPAPI({
  endpoint: `${Config.WooCommerce.url}/wp-json`,
});

export default wpAPI;
