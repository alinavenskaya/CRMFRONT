// import article from "./reducers/article";
// import articleList from "./reducers/articleList";
import auth from "./reducers/auth";
import { combineReducers } from "redux";
import common from "./reducers/common";
// import editor from "./reducers/editor";
// import home from "./reducers/home";
// import profile from "./reducers/profile";
// import settings from "./reducers/settings";
import { connectRouter } from "connected-react-router";

import { appReducer } from "./reducers";
import { routeReducer } from "./Containers/Drawer/reducers";
import { boardReducer } from "./Components/Board/reducers";

export default history =>
  combineReducers({
    appReducer,
    routeReducer,
    boardReducer,
    auth,
    common,
    router: connectRouter(history)
  });
