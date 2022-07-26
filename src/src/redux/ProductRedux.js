/** @format */

import { Constants, Languages } from "@common";
import moment from "moment";
import { WooWorker } from "api-ecommerce";
import WPUserAPI from '../services/WPUserAPI'

const types = {
  FETCH_PRODUCTS_PENDING: "FETCH_PRODUCTS_PENDING",
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",
  FETCH_ALL_PRODUCTS_SUCCESS: "FETCH_ALL_PRODUCTS_SUCCESS",
  FETCH_ALL_PRODUCTS_MORE: "FETCH_ALL_PRODUCTS_MORE",
  FETCH_PRODUCTS_FAILURE: "FETCH_PRODUCTS_FAILURE",
  CLEAR_PRODUCTS: "CLEAR_PRODUCTS",
  INIT_PRODUCTS: "INIT_PRODUCTS",
  FETCH_REVIEWS_PENDING: "FETCH_REVIEWS_PENDING",
  FETCH_REVIEWS_SUCCESS: "FETCH_REVIEWS_SUCCESS",
  FETCH_REVIEWS_FAILURE: "FETCH_REVIEWS_FAILURE",
  FETCH_PRODUCTS_BY_TAGS_PENDING: "FETCH_PRODUCTS_BY_TAGS_PENDING",
  FETCH_PRODUCTS_BY_TAGS_SUCCESS: "FETCH_PRODUCTS_BY_TAGS_SUCCESS",
  FETCH_PRODUCTS_BY_TAGS_FAILURE: "FETCH_PRODUCTS_BY_TAGS_FAILURE",
  FETCH_PRODUCTS_BY_NAME_PENDING: "FETCH_PRODUCTS_BY_NAME_PENDING",
  FETCH_PRODUCTS_BY_NAME_SUCCESS: "FETCH_PRODUCTS_BY_NAME_SUCCESS",
  FETCH_PRODUCTS_BY_NAME_MORE: "FETCH_PRODUCTS_BY_NAME_MORE",
  FETCH_PRODUCTS_BY_NAME_FAILURE: "FETCH_PRODUCTS_BY_NAME_FAILURE",
  FETCH_PRODUCTS_STICKY_PENDING: "FETCH_PRODUCTS_STICKY_PENDING",
  FETCH_PRODUCTS_STICKY_SUCCESS: "FETCH_PRODUCTS_STICKY_SUCCESS",
  FETCH_PRODUCTS_STICKY_FAILURE: "FETCH_PRODUCTS_STICKY_FAILURE",
  FETCH_PRODUCTS_MORE: "FETCH_PRODUCTS_MORE",
  FETCH_PRODUCTS_VARIANT_PENDING: "FETCH_PRODUCTS_VARIANT_PENDING",
  FETCH_PRODUCTS_VARIANT_SUCCESS: "FETCH_PRODUCTS_VARIANT_SUCCESS",
  FETCH_PRODUCTS_VARIANT_FAIL: "FETCH_PRODUCTS_VARIANT_FAIL",
  FETCH_PRODUCTS_RELATED_PENDING: "FETCH_PRODUCTS_RELATED_PENDING",
  FETCH_PRODUCTS_RELATED_SUCCESS: "FETCH_PRODUCTS_RELATED_SUCCESS",
  FETCH_PRODUCTS_RELATED_FAIL: "FETCH_PRODUCTS_RELATED_FAIL",
  GET_COUPON_CODE_PENDING: "GET_COUPON_CODE_PENDING",
  GET_COUPON_CODE_SUCCESS: "GET_COUPON_CODE_SUCCESS",
  GET_COUPON_CODE_FAIL: "GET_COUPON_CODE_FAIL",
  CLEAN_OLD_COUPON: "CLEAN_OLD_COUPON",
  SWITCH_LAYOUT_HOME: "SWITCH_LAYOUT_HOME",
  SAVE_SEARCH_HISTORY: "SAVE_SEARCH_HISTORY",
  CLEAR_SEARCH_HISTORY: "CLEAR_SEARCH_HISTORY",
};

export const actions = {
  fetchProductsByCategoryId: async (
    dispatch,
    categoryId,
    per_page,
    page,
    filters = {}
  ) => {
    dispatch({ type: types.FETCH_PRODUCTS_PENDING });
    const json = await WooWorker.productsByCategoryId(
      categoryId,
      per_page,
      page,
      filters
    );
    if (json === undefined) {
      dispatch(actions.fetchProductsFailure("Can't get data from server"));
    } else if (json.code) {
      dispatch(actions.fetchProductsFailure(json.message));
    } else {
      dispatch(actions.fetchProductsSuccess(json));
    }
  },
  fetchProductsSuccess: (items) => ({
    type: types.FETCH_PRODUCTS_SUCCESS,
    items,
    finish: true,
  }),
  fetchProductsFailure: (error) => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    error,
  }),
  clearProducts: () => ({ type: types.CLEAR_PRODUCTS }),
  initProduct: () => ({ type: types.INIT_PRODUCTS }),
  fetchReviewsByProductId: async (dispatch, productId) => {
    dispatch({ type: types.FETCH_REVIEWS_PENDING });

    const json = await WooWorker.reviewsByProductId(productId, "wc/v2");
    if (json === undefined) {
      dispatch({
        type: types.FETCH_REVIEWS_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({ type: types.FETCH_REVIEWS_FAILURE, message: json.message });
    } else {
      dispatch({ type: types.FETCH_REVIEWS_SUCCESS, reviews: json });
    }
  },
  fetchProductsByTag: async (dispatch, tag) => {
    dispatch({ type: types.FETCH_PRODUCTS_BY_TAGS_PENDING });
    const json = await WooWorker.productsByTagId(tag, 10, 1);
    if (json === undefined) {
      dispatch({
        type: types.FETCH_PRODUCTS_BY_TAGS_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({
        type: types.FETCH_PRODUCTS_BY_TAGS_FAILURE,
        message: json.message,
      });
    } else {
      dispatch({ type: types.FETCH_PRODUCTS_BY_TAGS_SUCCESS, products: json });
    }
  },

  fetchProductsByName: async (
    dispatch,
    name,
    per_page = 20,
    page = 1,
    filter = {}
  ) => {
    dispatch({ type: types.FETCH_PRODUCTS_BY_NAME_PENDING });
    const json = await WooWorker.productsByName(name, per_page, page, filter);

    if (json === undefined) {
      dispatch({
        type: types.FETCH_PRODUCTS_BY_NAME_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({
        type: types.FETCH_PRODUCTS_BY_NAME_FAILURE,
        message: json.message,
      });
    } else {
      dispatch({
        type:
          page == 1
            ? types.FETCH_PRODUCTS_BY_NAME_SUCCESS
            : types.FETCH_PRODUCTS_BY_NAME_MORE,
        productsByName: json,
        isMore: json.length == per_page,
        currentSearchPage: page,
      });
    }
  },
  fetchStickyProducts: async (dispatch, per_page = 8, page = 1) => {
    dispatch({ type: types.FETCH_PRODUCTS_STICKY_PENDING });
    const json = await WooWorker.productSticky(
      per_page,
      page,
      Constants.tagIdBanner
    );
    if (json === undefined) {
      dispatch({
        type: types.FETCH_PRODUCTS_STICKY_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({
        type: types.FETCH_PRODUCTS_STICKY_FAILURE,
        message: json.message,
      });
    } else {
      dispatch({
        type: types.FETCH_PRODUCTS_STICKY_SUCCESS,
        productSticky: json,
      });
    }
  },
  fetchAllProducts: async (dispatch, per_page = 20, page = 1) => {
    dispatch({ type: types.FETCH_PRODUCTS_PENDING });
    const json = await WooWorker.getAllProducts(
      per_page,
      page,
      Constants.PostList.order,
      Constants.PostList.orderby
    );
    if (json === undefined) {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (page > 1) {
      dispatch({
        type: types.FETCH_ALL_PRODUCTS_MORE,
        items: json,
        page,
        finish: true,
      });
    } else {
      dispatch({
        type: types.FETCH_ALL_PRODUCTS_SUCCESS,
        items: json,
        page,
        finish: true,
      });
    }
  },
  getProductVariations: async (dispatch, product, per_page = 100, page = 1) => {
    dispatch({ type: types.FETCH_PRODUCTS_VARIANT_PENDING });
    const json = await WooWorker.productVariant(product, per_page, page);

    if (json === undefined) {
      dispatch({
        type: types.FETCH_PRODUCTS_VARIANT_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({
        type: types.FETCH_PRODUCTS_VARIANT_FAIL,
        message: json.message,
      });
    } else {
      dispatch({ type: types.FETCH_PRODUCTS_VARIANT_SUCCESS, items: json });
    }
  },
  fetchProductRelated: async (dispatch, product) => {
    dispatch({ type: types.FETCH_PRODUCTS_RELATED_PENDING });
    const categories = product.categories;
    if (categories.length > 0) {
      const categoryId = categories[0].id;
      const json = await WooWorker.productsByCategoryId(categoryId, 10, 1);
      if (json === undefined) {
        dispatch({
          type: types.FETCH_PRODUCTS_RELATED_FAIL,
          message: Languages.ErrorMessageRequest,
        });
      } else if (json.code) {
        dispatch({
          type: types.FETCH_PRODUCTS_RELATED_FAIL,
          message: json.message,
        });
      } else {
        dispatch({
          type: types.FETCH_PRODUCTS_RELATED_SUCCESS,
          productRelated: json,
        });
      }
    } else {
      dispatch({
        type: types.FETCH_PRODUCTS_RELATED_SUCCESS,
        productRelated: [],
      });
    }
  },
  cleanOldCoupon: async (dispatch) => {
    dispatch({ type: types.CLEAN_OLD_COUPON });
  },
  getCouponAmount: async (dispatch, code,data, totalPrice) => {
    dispatch({ type: types.GET_COUPON_CODE_PENDING });
    const json = await WPUserAPI.getAll()
    console.log(json)
    if (json === undefined) {
      console.log('----------');
      dispatch({
        type: types.GET_COUPON_CODE_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({ type: types.GET_COUPON_CODE_FAIL, message: json.message });
    } else {
      let amount = 0;
      let message = "";
      let id = null;
      let theCouponId=null;
      let discountType = "percent";
      // let minimumAmount = 0;
      // let maximumAmount = 0;
      json.forEach((item) => {
        // console.log(item.code,item.id)
       let MyItem=data.coupons.filter(item1=>item1.coupon_id===item.id&&!item1.pay_at)
        // console.log(MyItem);
        //在我的优惠券里查找到相应的id
        if (item.code === code&&MyItem.length) {
          if (item.date_expires) {
            const dateExpires = moment(item.date_expires);
            const today = moment();
            if (dateExpires.diff(today) > 0) {
              if (
                totalPrice >= parseFloat(item.minimum_amount) &&
                totalPrice <= parseFloat(item.maximum_amount)
              ) {
                amount = item.amount;
              }
              if (totalPrice >= parseFloat(item.minimum_amount)) {
                amount = item.amount;
              }

              if (totalPrice <= parseFloat(item.maximum_amount)) {
                amount = item.amount;
              }
            } else {
              message = Languages.couponCodeIsExpired;
            }
          } else {
            // console.log("===========================")
            console.log(MyItem[0].coupon_id)
            if (
              totalPrice >= parseFloat(item.minimum_amount) &&
              totalPrice <= parseFloat(item.maximum_amount)
            ) {
              amount = item.amount;
              discountType = item.discount_type;
              id = MyItem[0].id;
              theCouponId=MyItem[0].coupon_id;
            }
            if (totalPrice >= parseFloat(item.minimum_amount)) {
              amount = item.amount;
              discountType = item.discount_type;
              id = MyItem[0].id;
              theCouponId=MyItem[0].coupon_id;
            }

            if (totalPrice <= parseFloat(item.maximum_amount)) {
              amount = item.amount;
              discountType = item.discount_type;
              id = MyItem[0].id;
              theCouponId=MyItem[0].coupon_id;
            }


          }
        }
      });

      if (amount === 0) {
        if (message.length > 0) {
          dispatch({ type: types.GET_COUPON_CODE_FAIL, message });
        } else {
          dispatch({
            type: types.GET_COUPON_CODE_FAIL,
            message: Languages.invalidCouponCode,
          });
        }
      } else {
        dispatch({
          type: types.GET_COUPON_CODE_SUCCESS,
          amount,
          code,
          discountType,
          id,
          Mycoupon:data,
          theCouponId
          // JSON.stringify(data)
        });
      }
    }
  },
  switchLayoutHomePage: (layout) => {
    return { type: types.SWITCH_LAYOUT_HOME, layout };
  },
  saveSearchHistory: (dispatch, searchText) => {
    dispatch({ type: types.SAVE_SEARCH_HISTORY, searchText });
  },
  clearSearchHistory: (dispatch) => {
    dispatch({ type: types.CLEAR_SEARCH_HISTORY });
  },
};

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  listAll: [],
  stillFetch: true,
  page: 1,
  layoutHome: Constants.Layout.horizon,

  productFinish: false,
  productsByName: [],
  productSticky: [],
  productVariations: null,

  productRelated: [],
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page, finish } = action;
  switch (type) {
    case types.FETCH_PRODUCTS_PENDING:
    case types.FETCH_PRODUCTS_BY_TAGS_PENDING:
    case types.FETCH_PRODUCTS_BY_NAME_PENDING:
    case types.FETCH_PRODUCTS_STICKY_PENDING:
    case types.FETCH_PRODUCTS_VARIANT_PENDING:
    case types.FETCH_REVIEWS_PENDING:
    case types.FETCH_PRODUCTS_RELATED_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message: "",
      };
    }

    case types.FETCH_PRODUCTS_STICKY_FAILURE:
    case types.FETCH_PRODUCTS_BY_TAGS_FAILURE:
    case types.FETCH_PRODUCTS_BY_NAME_FAILURE:
    case types.FETCH_PRODUCTS_VARIANT_FAIL:
    case types.FETCH_REVIEWS_FAILURE:
    case types.FETCH_PRODUCTS_FAILURE:
    case types.FETCH_PRODUCTS_RELATED_FAIL: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case types.FETCH_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        listAll: items,
        stillFetch: items.length !== 0,
        error: null,
        page,
        productFinish: finish,
      };
    }

    case types.FETCH_ALL_PRODUCTS_MORE: {
      return {
        ...state,
        isFetching: false,
        listAll: state.listAll.concat(items),
        stillFetch: items.length !== 0,
        error: null,
        page,
        productFinish: finish,
      };
    }

    case types.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.concat(items),
        stillFetch: items.length !== 0,
        error: null,
        productFinish: finish,
      };
    }

    case types.CLEAR_PRODUCTS: {
      initialState.listAll = state.listAll;
      initialState.layoutHome = state.layoutHome;
      initialState.productSticky = state.productSticky;
      return { ...initialState };
    }

    case types.INIT_PRODUCTS: {
      initialState.layoutHome = state.layoutHome;
      return { ...initialState };
    }

    case types.FETCH_REVIEWS_SUCCESS: {
      return { ...state, isFetching: false, reviews: action.reviews };
    }

    case types.FETCH_PRODUCTS_BY_TAGS_SUCCESS: {
      return { ...state, isFetching: false, products: action.products };
    }

    case types.FETCH_PRODUCTS_BY_NAME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productsByName: action.productsByName,
        isSearchMore: action.isMore,
        currentSearchPage: action.currentSearchPage,
      };
    }

    case types.FETCH_PRODUCTS_BY_NAME_MORE: {
      return {
        ...state,
        isFetching: false,
        productsByName: state.productsByName.concat(action.productsByName),
        isSearchMore: action.isMore,
        currentSearchPage: action.currentSearchPage,
      };
    }

    case types.FETCH_PRODUCTS_STICKY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productSticky: state.productSticky.concat(action.productSticky),
      };
    }

    case types.FETCH_PRODUCTS_VARIANT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productVariations: items,
        error: null,
      };
    }

    case types.FETCH_PRODUCTS_RELATED_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productRelated: action.productRelated,
        error: null,
      };
    }
    case types.GET_COUPON_CODE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        coupon: {
          amount: action.amount,
          type: action.discountType,
          code: action.code,
          id: action.id,
          theId:action.theCouponId
        },
        Mycoupon:action.Mycoupon,
        error: null,
      };
    }
    case types.CLEAN_OLD_COUPON: {
      return {
        ...state,
        coupon: {
          amount: 0,
          code: "",
        },
      };
    }
    case types.SWITCH_LAYOUT_HOME: {
      return {
        ...state,
        layoutHome: action.layout,
      };
    }
    case types.GET_COUPON_CODE_PENDING: {
      return {
        ...state,
        isFetching: true,
        type,
        error: null,
      };
    }
    case types.GET_COUPON_CODE_FAIL: {
      return {
        ...state,
        isFetching: false,
        type,
        message: action.message,
      };
    }
    case types.SAVE_SEARCH_HISTORY: {
      let histories = state.histories;
      if (histories == undefined) {
        histories = [];
      }
      if (histories.indexOf(action.searchText) == -1) {
        histories.unshift(action.searchText);
      }
      if (histories.length > 10) {
        histories.pop();
      }
      return {
        ...state,
        histories,
      };
    }
    case types.CLEAR_SEARCH_HISTORY: {
      return {
        ...state,
        histories: [],
      };
    }
    default: {
      return state;
    }
  }
};
