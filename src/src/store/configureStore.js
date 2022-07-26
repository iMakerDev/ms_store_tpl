/** @format */
import Reactotron from "reactotron-react-native";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducers from "@redux";
import { Constants } from "@common";
import { connectConsoleToReactotron } from "@app/Omni";
import "./../../ReactotronConfig";

const middleware = [
  thunk,
  // more middleware
];

// const store = createStore(reducers, {}, applyMiddleware(...middleware));

const configureStore = () => {
  let store = null;
  if (__DEV__) {
    if (Constants.useReactotron) {
      store = createStore(
        reducers,
        {},
        compose(applyMiddleware(...middleware),Reactotron.createEnhancer())
      );
      connectConsoleToReactotron();
    } else {
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      store = composeEnhancers(applyMiddleware(...middleware))(createStore)(
        reducers
      );

      if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducers, () => {
          const nextRootReducer = reducers;
          store.replaceReducer(nextRootReducer);
        });
      }

      // show network react-native-debugger
      // only show on IOS, android bug
      // if (Platform.OS === "ios") {
      global.XMLHttpRequest = global.originalXMLHttpRequest
        ? global.originalXMLHttpRequest
        : global.XMLHttpRequest;
      global.FormData = global.originalFormData
        ? global.originalFormData
        : global.FormData;
      // }
    }
  } else {
    store = compose(applyMiddleware(...middleware))(createStore)(reducers);
  }
  return store;
};

export default configureStore();
