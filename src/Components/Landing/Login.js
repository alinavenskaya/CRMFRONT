import ListErrors from "../ListErrors";
import React from "react";
import agent from "../../agent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { email, password } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.submitForm(email, password)}>
          <div>
            <DialogTitle id="form-dialog-title">Войти</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="Email"
                label="Email"
                type="text"
                fullWidth
                value={email}
                onChange={this.changeEmail}
              />
              <TextField
                margin="dense"
                id="password"
                label="Пароль"
                type="password"
                fullWidth
                value={password}
                onChange={this.changePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Отмена
              </Button>
              <Button
                color="primary"
                disabled={this.props.inProgress}

                type="submit"
              >
                Войти
              </Button>
            </DialogActions>
          </div>
        </form>
        <ListErrors errors={this.props.errors} />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
