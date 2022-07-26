/** @format */

import { Constants, Tools, Languages } from "@common";
import { WooWorker } from "api-ecommerce";
import Validate from "../utils/Validate.js";
import WooCommerce from "../common/Config"
import Config from "../common/Config";

const types = {
  ADD_CART_ITEM: "ADD_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  DELETE_CART_ITEM: "DELETE_CART_ITEM",
  EMPTY_CART: "EMPTY_CART",
  CREATE_NEW_ORDER_PENDING: "CREATE_NEW_ORDER_PENDING",
  CREATE_NEW_ORDER_SUCCESS: "CREATE_NEW_ORDER_SUCCESS",
  CREATE_NEW_ORDER_ERROR: "CREATE_NEW_ORDER_ERROR",
  VALIDATE_CUSTOMER_INFO: "VALIDATE_CUSTOMER_INFO",
  INVALIDATE_CUSTOMER_INFO: "INVALIDATE_CUSTOMER_INFO",
  FETCH_MY_ORDER: "FETCH_MY_ORDER",
  FETCH_CART_PENDING: "FETCH_CART_PENDING",
  GET_SHIPPING_METHOD_PENDING: "GET_SHIPPING_METHOD_PENDING",
  GET_SHIPPING_METHOD_SUCCESS: "GET_SHIPPING_METHOD_SUCCESS",
  GET_SHIPPING_METHOD_FAIL: "GET_SHIPPING_METHOD_FAIL",
  SELECTED_SHIPPING_METHOD: "SELECTED_SHIPPING_METHOD",
  GET_ORDER_NOTES_PENDING: "GET_ORDER_NOTES_PENDING",
  GET_ORDER_NOTES_SUCCESS: "GET_ORDER_NOTES_SUCCESS",
  GET_ORDER_NOTES_FAIL: "GET_ORDER_NOTES_FAIL",
  UPDATE_USER_META_DATA: "UPDATE_USER_META_DATA",
};

export const actions = {
  updateUserMetaData: (dispatch,user,data) => {
    console.log("++++");
    console.log(data);
    console.log("++++++");
    dispatch({type:types.UPDATE_USER_META_DATA});
    const url = `${Config.WooCommerce.url}/wp-json/wc/v3/customers/${user.id}?consumer_key=${Config.WooCommerce.consumerKey}&consumer_secret=${Config.WooCommerce.consumerSecret}`;
    console.log(url);
    fetch(url,{
      method: "PUT",
      headers: {
          'Content-type': 'application/json'
      },
      body:JSON.stringify({"meta_data" : data}),
    }).then(res => console.log(res.json().then(r=>console.log(r)))).catch(err => console.log(err));
  },
  addCartItem: (dispatch, product, variation) => {
    dispatch({
      type: types.ADD_CART_ITEM,
      product,
      variation,
    });
  },
  fetchMyOrder: (dispatch, user,token) => {
    dispatch({ type: types.FETCH_CART_PENDING });
    console.log('获取用户订单');
    console.log(token);
    // if(!token){
    //   console.log('token blank')
    //   return;
    // }
    WooWorker.ordersByCustomerId(user.id,`40&token=${token}&timestamp=${Date.now()}`, 1)
      .then((data) => {
        console.log('respone');
        console.log(data);
        console.log('order list')
        console.log(data.length)
        if(Array.isArray(data)){
          dispatch({
            type: types.FETCH_MY_ORDER,
            data,
          });
        }else{
          dispatch({
            type:types.EMPTY_CART
          })
        }
      })
      .catch((err) => {
        dispatch({
          type:types.EMPTY_CART
        })
      });
  },

  removeCartItem: (dispatch, product, variation) => {
    dispatch({
      type: types.REMOVE_CART_ITEM,
      product,
      variation,
    });
  },

  deleteCartItem: (dispatch, product, variation, quantity) => {
    dispatch({
      type: types.DELETE_CART_ITEM,
      product,
      variation,
      quantity,
    });
  },

  emptyCart: (dispatch) => {
    dispatch({
      type: types.EMPTY_CART,
    });
  },
  validateCustomerInfo: (dispatch, customerInfo) => {
    const { first_name, last_name, address_1, email, phone } = customerInfo;
    if (
      first_name.length == 0 ||
      last_name.length == 0 ||
      address_1.length == 0 ||
      email.length == 0 ||
      phone.length == 0
    ) {
      dispatch({
        type: types.INVALIDATE_CUSTOMER_INFO,
        message: Languages.RequireEnterAllFileds,
      });
    } else if (!Validate.isEmail(email)) {
      dispatch({
        type: types.INVALIDATE_CUSTOMER_INFO,
        message: Languages.InvalidEmail,
      });
    } else {
      dispatch({
        type: types.VALIDATE_CUSTOMER_INFO,
        message: "",
        customerInfo,
      });
    }
  },
  createNewOrder: async (dispatch, payload) => {
    dispatch({ type: types.CREATE_NEW_ORDER_PENDING });

    const json = await WooWorker.createOrder(payload);

    if (json.hasOwnProperty("id")) {
      // dispatch({type: types.EMPTY_CART});
      dispatch({ type: types.CREATE_NEW_ORDER_SUCCESS, orderId: json.id });
    } else {
      dispatch({
        type: types.CREATE_NEW_ORDER_ERROR,
        message: Languages.CreateOrderError,
      });
    }
  },
  getShippingMethod: async (dispatch, payload) => {
    dispatch({ type: types.GET_SHIPPING_METHOD_PENDING });
    const json = await WooWorker.getShippingMethod(payload);

    if (json === undefined) {
      dispatch({
        type: types.GET_SHIPPING_METHOD_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({ type: types.GET_SHIPPING_METHOD_FAIL, message: json.message });
    } else {
      dispatch({ type: types.GET_SHIPPING_METHOD_SUCCESS, shippings: json });
    }
  },
  selectShippingMethod: (dispatch, shippingMethod) => {
    dispatch({ type: types.SELECTED_SHIPPING_METHOD, shippingMethod });
  },

  finishOrder: async (dispatch, payload) => {
    dispatch({ type: types.CREATE_NEW_ORDER_SUCCESS });
  },

  getOrderNotes: async (dispatch, orderId) => {
    dispatch({ type: types.GET_ORDER_NOTES_PENDING });
    const json = await WooWorker.getOrderNotes(orderId);

    if (json === undefined) {
      dispatch({
        type: types.GET_ORDER_NOTES_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    } else if (json.code) {
      dispatch({ type: types.GET_ORDER_NOTES_FAIL, message: json.message });
    } else {
      dispatch({ type: types.GET_ORDER_NOTES_SUCCESS, orderNotes: json });
    }
  },
};

const initialState = {
  cartItems: [],
  total: 0,
  totalPrice: 0,
  myOrders: undefined,
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case types.ADD_CART_ITEM: {
      const isExisted = state.cartItems.some((cartItem) =>
        compareCartItem(cartItem, action)
      );

      return Object.assign(
        {},
        state,
        isExisted
          ? { cartItems: state.cartItems.map((item) => cartItem(item, action)) }
          : { cartItems: [...state.cartItems, cartItem(undefined, action)] },
        {
          total: state.total + 1,
          totalPrice: state.totalPrice + getPrice(action),
        }
      );
    }
    case types.REMOVE_CART_ITEM: {
      const index = state.cartItems.findIndex((cartItem) =>
        compareCartItem(cartItem, action)
      ); // check if existed
      return index == -1
        ? state // This should not happen, but catch anyway
        : Object.assign(
          {},
          state,
          state.cartItems[index].quantity == 1
            ? {
              cartItems: state.cartItems.filter(
                (cartItem) => !compareCartItem(cartItem, action)
              ),
            }
            : {
              cartItems: state.cartItems.map((item) =>
                cartItem(item, action)
              ),
            },
          {
            total: state.total - 1,
            totalPrice: state.totalPrice - getPrice(action),
          }
        );
    }
    case types.DELETE_CART_ITEM: {
      const index1 = state.cartItems.findIndex((cartItem) =>
        compareCartItem(cartItem, action)
      ); // check if existed
      return index1 == -1
        ? state // This should not happen, but catch anyway
        : Object.assign({}, state, {
          cartItems: state.cartItems.filter(
            (cartItem) => !compareCartItem(cartItem, action)
          ),
          total: state.total - Number(action.quantity),
          totalPrice:
            state.totalPrice - Number(action.quantity) * getPrice(action),
        });
    }
    case types.EMPTY_CART:
      return Object.assign({}, state, {
        type: types.EMPTY_CART,
        cartItems: [],
        total: 0,
        totalPrice: 0,
      });
    case types.INVALIDATE_CUSTOMER_INFO:
      return Object.assign({}, state, {
        message: action.message,
        type: types.INVALIDATE_CUSTOMER_INFO,
      });
    case types.VALIDATE_CUSTOMER_INFO:
      return Object.assign({}, state, {
        message: null,
        type: types.VALIDATE_CUSTOMER_INFO,
        customerInfo: action.customerInfo,
      });
    case types.CREATE_NEW_ORDER_SUCCESS:
      return Object.assign({}, state, {
        type: types.CREATE_NEW_ORDER_SUCCESS,
        cartItems: [],
        total: 0,
        totalPrice: 0,
      });
    case types.CREATE_NEW_ORDER_ERROR:
      return Object.assign({}, state, {
        type: types.CREATE_NEW_ORDER_ERROR,
        message: action.message,
      });
    case types.FETCH_MY_ORDER:
      return Object.assign({}, state, {
        type: types.FETCH_MY_ORDER,
        isFetching: false,
        myOrders: action.data,
      });
    case types.UPDATE_USER_META_DATA:
      return {...state};
    case types.FETCH_CART_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.GET_SHIPPING_METHOD_PENDING:{
      return Object.assign({},state,{
        ...state,
        isFetching:true,
        error: null,
      })
    }
    case types.GET_ORDER_NOTES_PENDING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        error: null,
      });
    }
    case types.GET_SHIPPING_METHOD_FAIL:{
      return Object.assign({},state,{
        isFetching:false,
        error:action.error,
      })
    }
    case types.GET_ORDER_NOTES_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    }
    case types.GET_SHIPPING_METHOD_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        shippings: action.shippings,
        error: null,
      });
    }
    case types.GET_ORDER_NOTES_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        orderNotes: action.orderNotes,
        error: null,
      });
    }
    case types.SELECTED_SHIPPING_METHOD: {
      return Object.assign({}, state, {
        ...state,
        shippingMethod: action.shippingMethod,
      });
    }
    default: {
      return state;
    }
  }
};

const compareCartItem = (cartItem, action) => {
  // warn(action.variation);
  if (action.variation) {
    if (cartItem.variation) {
      return (
        cartItem.product.id === action.product.id &&
        cartItem.variation.id === action.variation.id
      );
    }
    return false;
  }

  return cartItem.product.id === action.product.id;
};

const cartItem = (
  state = { product: undefined, quantity: 1, variation: undefined },
  action
) => {
  switch (action.type) {
    case types.ADD_CART_ITEM:
      return state.product === undefined
        ? Object.assign({}, state, {
          product: action.product,
          variation: action.variation,
        })
        : !compareCartItem(state, action)
          ? state
          : Object.assign({}, state, {
            quantity:
              state.quantity < Constants.LimitAddToCart
                ? state.quantity + 1
                : state.quantity,
          });
    case types.REMOVE_CART_ITEM:
      return !compareCartItem(state, action)
        ? state
        : Object.assign({}, state, { quantity: state.quantity - 1 });
    default:
      return state;
  }
};

// get price from variation or product and format
function getPrice(action) {
  return Number(
    action.variation === undefined ||
    action.variation == null ||
    action.variation.price === undefined ||
    action.variation.price === ""
      ? Tools.getPriceIncludedTaxAmount(action.product, null, true)
      : Tools.getPriceIncludedTaxAmount(action.variation, null, true)
  );
}
