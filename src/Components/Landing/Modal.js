import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Login from "./Login";
import Register from "./Register";
const styles = theme => ({
  container: {
    width: "100%",
    margin: 0
  },
  leftImage: {
    width: "100%"
  }
});
class LandingModal extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <Grid
            container
            spacing={32}
            alignItems="center"
            direction="row"
            className={classes.container}
            justify="center"
          >
            <Grid item xs={6}>
              <img
                src="/images/Auth.svg"
                alt="FluentCRM logo"
                className={classes.leftImage}
              />
            </Grid>
            <Grid item xs={6}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
              >
                <Tab label="Войти" />
                <Tab label="Регистрация" />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <div>
                  <Login handleClose={this.props.handleClose} />
                </div>
                <div>
                  <Register handleClose={this.props.handleClose} />
                </div>
              </SwipeableViews>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LandingModal);
