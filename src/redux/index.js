/** @format */

import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

// You have to import every reducers and combine them.
import { reducer as AppReducer } from "./AppRedux";
import { reducer as CategoryReducer } from "./CategoryRedux";
import { reducer as ProductRedux } from "./ProductRedux";
import { reducer as NetInfoReducer } from "./NetInfoRedux";
import { reducer as ToastReducer } from "./ToastRedux";
import { reducer as UserRedux } from "./UserRedux";
import { reducer as CartRedux } from "./CartRedux";
import { reducer as WishListRedux } from "./WishListRedux";
import { reducer as NewsRedux } from "./NewsRedux";
import { reducer as LayoutRedux } from "./LayoutRedux";
import { reducer as PaymentRedux } from "./PaymentRedux";
import { reducer as CountryRedux } from "./CountryRedux";
import { reducer as LangRedux } from "./LangRedux";
import { reducer as CurrencyRedux } from "./CurrencyRedux";
import { reducer as SideMenuRedux } from "./SideMenuRedux";
import { reducer as TagRedux } from "./TagRedux";
import { reducer as AddressRedux } from "./AddressRedux";
import { reducer as BrandsRedux } from "./BrandsRedux";
import { reducer as FilterRedux } from "./FilterRedux";
import { reducer as MemberPointsRedux } from "./MemberPointsRedux";

const config = {
  key: "root",
  storage,
  blacklist: [
    "netInfo",
    "toast",
    "nav",
    "layouts",
    "payment",
    "sideMenu",
    "filters",
    "carts",
  ],
};

export default persistCombineReducers(config, {
  app: AppReducer,
  categories: CategoryReducer,
  products: ProductRedux,
  netInfo: NetInfoReducer,
  toast: ToastReducer,
  user: UserRedux,
  carts: CartRedux,
  wishList: WishListRedux,
  news: NewsRedux,
  layouts: LayoutRedux,
  language: LangRedux,
  payments: PaymentRedux,
  countries: CountryRedux,
  currency: CurrencyRedux,
  sideMenu: SideMenuRedux,
  tags: TagRedux,
  addresses: AddressRedux,
  brands: BrandsRedux,
  filters: FilterRedux,
  memberPoints: MemberPointsRedux,
});
