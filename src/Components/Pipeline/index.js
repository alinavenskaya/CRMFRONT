// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import DealModal from "../DealModal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Board from "../../Components/Board";
import { openDealModal } from "../Board/actions";
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    openDealModal: type => dispatch(openDealModal(type))
  };
};
const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Pipeline extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Board withScrollableColumns />
        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => this.props.openDealModal("insert")}
        >
          <AddIcon />
        </Fab>
        <DealModal />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Pipeline));
