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
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <React.Fragment>
        <form onSubmit={this.submitForm(username, email, password)}>
          <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
          <DialogContent>
            <TextField
              autofocus
              margin="dense"
              id="username"
              label="Логин"
              type="text"
              fullWidth
              value={this.props.username}
              onChange={this.changeUsername}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              defaultValue={this.props.email}
              onChange={this.changeEmail}
            />
            <TextField
              margin="dense"
              id="password"
              label="Пароль"
              type="password"
              fullWidth
              defaultValue={this.props.password}
              onChange={this.changePassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Отмена
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={this.props.inProgress}
            >
              Регистрация
            </Button>
          </DialogActions>
        </form>
        <ListErrors errors={this.props.errors} />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
