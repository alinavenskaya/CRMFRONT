import auth from "./reducers/auth";
import { combineReducers } from "redux";
import common from "./reducers/common";
import { connectRouter } from "connected-react-router";
import { appReducer } from "./reducers";
import { routeReducer } from "./Containers/Drawer/reducers";
import { boardReducer } from "./Components/Board/reducers";
import clients from "./reducers/clients";
import dashboard from "./reducers/dashboard";

export default history =>
  combineReducers({
    appReducer,
    routeReducer,
    boardReducer,
    auth,
    common,
    clients,
    dashboard,
    router: connectRouter(history)
  });
