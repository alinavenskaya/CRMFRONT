import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  loadingShading: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, .3)",
  },

  loadingIcon: {
    position: "absolute",
    fontSize: "20px",
    top: "calc(45% - 10px)",
    left: "calc(50% - 10px)",
  }
}


const Loading = (props) => (
  <div className={props.classes.loadingShading}>
    <CircularProgress className={props.classes.loadingIcon} />
  </div>
);

export default withStyles(styles)(Loading);