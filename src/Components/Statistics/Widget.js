import React, { Component } from "react";
import { Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    width: "100%",
    boxShadow: "none",
    border: "1px solid #eee",
    borderRadius: ".8rem"
    // boxShadow: "inset 0 0 0 20px rgba(0,0,0,.24)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.6rem",
    paddingLeft: "1.6rem",
    paddingRight: ".4rem"
  },
  body: {
    textAlign: "center",
    paddingBottom: "2.8rem",
    paddingTop: "1.2rem"
  },
  bodyValue: {
    fontSize: "3.5rem",
    lineHeight: 1
  },
  bodyTitle: {
    fintSize: "1.6rem"
  },

  footer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "1.6rem",
    paddingRight: "1.6rem",
    borderTop: "1px solid #eee",
    height: "60px"
  },
  footerText: {
    width: "100%",
    fontSize: "1.2rem",
    display: "flex"
  },
  footerTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  footerValue: {
    paddingLeft: ".8rem"
  }
};
class Widget extends Component {
  render() {
    const { widget, classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography className={classes.bodyTitle}>{widget.title}</Typography>
        </div>
        <div className={classes.body}>
          <Typography className={classes.bodyValue}>
            {widget.data.count}
          </Typography>
          <Typography className={classes.bodyTitle} color="textSecondary">
            {widget.data.label}
          </Typography>
        </div>
        {widget.data.extra && (
          <div className={classes.footer}>
            <Typography className={classes.footerText} color="textSecondary">
              <span className={classes.footerTitle}>
                {widget.data.extra.label}
              </span>
              :<b className={classes.footerValue}>{widget.data.extra.count}</b>
            </Typography>
          </div>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(Widget);
