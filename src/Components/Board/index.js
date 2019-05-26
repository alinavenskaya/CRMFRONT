import React, { Component } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { reorderDealMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CHANGE_COLUMNS, DEALS_LOADED } from "./constants";
import DealModal from "../DealModal";
import agent from "../../agent";
const mapStateToProps = state => ({ ...state.boardReducer });

const mapDispatchToProps = dispatch => {
  return {
    changeColumns: columns =>
      dispatch({
        type: CHANGE_COLUMNS,
        payload: columns
      }),
    onLoad: payload =>
      dispatch({
        type: DEALS_LOADED,
        payload
      })
  };
};

const styles = {
  container: {
    minHeight: "100%",
    minWidth: "100%",
    display: "inline-flex"
  }
};
class Board extends Component {
  async componentWillMount() {
    this.props.onLoad(await agent.Deals.all(1));
  }
  onDragEnd = result => {
    const { changeColumns } = this.props;
    const { destination, source, draggableId } = result;
    const sameSpot =
      source.droppableId === destination.droppableId &&
      source.index === destination.index;
    console.log(result);
    // dropped nowhere
    if (!destination) {
      return;
    }

    // fetch updating the deal
    agent.Deals.move(draggableId, {
      position: destination.index,
      stagename: destination.droppableId
    });

    const data = reorderDealMap({
      dealMap: this.props.columns,
      source,
      destination
    });
    console.log(data);
    changeColumns(data.dealMap);
  };

  render() {
    const { classes, columns, ordered } = this.props;
    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
      >
        {provided => (
          <div
            className={classes.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                deals={columns[key]}
                isScrollable={this.props.withScrollableColumns}
              />
            ))}
          </div>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>{board}</DragDropContext>
        <DealModal />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Board));
