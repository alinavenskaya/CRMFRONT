import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
// import createRootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import reducer from "./reducer";

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);

// export default preloadedState => {
//   const store = createStore(
//     createRootReducer(history), // root reducer with router state
//     preloadedState,
//     compose(
//       composeWithDevTools(
//         applyMiddleware(
//           routerMiddleware(history),
//           thunkMiddleware,
//           promiseMiddleware,
//           localStorageMiddleware,
//           createLogger()
//         )
//       )
//     )
//   );

//   return store;
// };

// export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(
      thunkMiddleware,
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware
    );
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      thunkMiddleware,
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(
  reducer(history),
  composeWithDevTools(getMiddleware())
);

// const getMiddleware = () => {
//   if (process.env.NODE_ENV === "production") {
//     return applyMiddleware(
//       myRouterMiddleware,
//       promiseMiddleware,
//       localStorageMiddleware,
//       thunkMiddleware
//     );
//   } else {
//     // Enable additional logging in non-production environments.
//     return applyMiddleware(
//       myRouterMiddleware,
//       promiseMiddleware,
//       localStorageMiddleware,
//       thunkMiddleware,
//       createLogger()
//     );
//   }
// };

// export const store = createStore(
//   reducer(history),
//   composeWithDevTools(getMiddleware())
// );
