import agent from "./agent";
import React from "react";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "./constants/actionTypes";
import { Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Loader from "./Components/Loader";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pipeline from "./Components/Pipeline";
import { store } from "./store";
import { push } from "connected-react-router";
import Drawer from "./Containers/Drawer";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";
import Client from "./Components/Clients";
import Statistics from "./Components/Statistics";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#5C6BC0", light: "#8E99F3", dark: "#26418F" },
    secondary: { main: "#80CBC4", light: "#B2FEF7", dark: "#4F9A94" }
  }
});
const mapStateToProps = state => ({ ...state.common });

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem("Token");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    const { appLoaded, currentUser, appName } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                appLoaded ? (
                  currentUser ? (
                    <Drawer currentUser={currentUser} appName={appName}>
                      <Pipeline />
                    </Drawer>
                  ) : (
                    <Landing />
                  )
                ) : (
                  <Loader />
                )
              }
            />
            {appLoaded ? (
              <Drawer
                currentUser={this.props.currentUser}
                appName={this.props.appName}
              >
                <Route exact path="/pipeline" component={Pipeline} />
                <Route exact path="/statistics" component={Statistics} />
                <Route exact path="/reports" component={Reports} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/clients" component={Client} />
              </Drawer>
            ) : (
              <Loader />
            )}
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
