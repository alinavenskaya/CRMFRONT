import React from "react";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  success: {
    backgroundColor: green[600]
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class CustomizedSnackbars extends React.Component {
  render() {
    const { open, classes, message, onClose } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes.success}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon
                className={classNames(classes.icon, classes.iconVariant)}
              />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Закрыть"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CustomizedSnackbars);
