import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
  }
};
class Loader extends React.Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <CircularProgress />
      </div>
    );
  }
}

export default withStyles(styles)(Loader);
