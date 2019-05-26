import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { HorizontalBar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import {
  DASHBOARD_LOADED,
  DASHBOARD_UNLOADED
} from "../../constants/actionTypes";
import Widget from "./Widget";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  h2: {
    fontWeight: "normal"
  },
  innerContainer: {
    width: 600
  }
});

const mapStateToProps = state => ({
  ...state.dashboard
});

const mapDispatchToProps = dispatch => ({
  onUnload: () => dispatch({ type: DASHBOARD_UNLOADED }),
  onLoad: payload => dispatch({ type: DASHBOARD_LOADED, payload })
});

class Staatistics extends React.Component {
  async componentWillMount() {
    this.props.onLoad(await agent.Dashboard.all());
  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    const {
      classes,
      firstcontact,
      meeting,
      sentoffer,
      sentcontract,
      inprocess,
      success,
      overdue,
      todo,
      done,
      missingtasks,
      incomechart
    } = this.props;
    return (
      <div className={classes.container}>
        <Grid
          container
          spacing={32}
          alignItems="center"
          direction="row"
          className={classes.container}
          justify="center"
        >
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Первый контакт",
                data: {
                  count: firstcontact ? firstcontact.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: firstcontact ? firstcontact.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Назначена встреча",
                data: {
                  count: meeting ? meeting.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: meeting ? meeting.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Отправлено КП",
                data: {
                  count: sentoffer ? sentoffer.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: sentoffer ? sentoffer.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Выслан договор",
                data: {
                  count: sentcontract ? sentcontract.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: sentcontract ? sentcontract.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Исполнение обязанностей",
                data: {
                  count: inprocess ? inprocess.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: inprocess ? inprocess.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: "Успех",
                data: {
                  count: success ? success.countdeals : 0,
                  label: "Сделок",
                  extra: {
                    label: "Сумма",
                    count: success ? success.sumprice : 0
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: "Просроченные задачи",
                data: {
                  count: overdue ? overdue : 0,
                  label: "Задач"
                  // extra: {
                  //   label: "Сумма",
                  //   count: firstcontact ? firstcontact.sumprice : 0
                  // }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: "Задачи к выполнению",
                data: {
                  count: todo ? todo : 0,
                  label: "Задач"
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: "Выполненные задачи",
                data: {
                  count: done ? done : 0,
                  label: "Задач"
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: "Сделок без задач",
                data: {
                  count: missingtasks ? missingtasks : 0,
                  label: "Сделок"
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <HorizontalBar
              height="30"
              data={{
                labels: ["Прибыль", "План"],
                datasets: [
                  {
                    backgroundColor: ["#00e676", "#03a9f4"],
                    data: [
                      incomechart ? incomechart.income : 0,
                      incomechart ? incomechart.goal : 0,
                      0
                    ]
                  }
                ]
              }}
              options={{
                gridLines: {
                  offsetGridLines: false
                },
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: "Цель"
                },
                scales: {
                  yAxes: [
                    {
                      barPercentage: 1,
                      categoryPercentage: 1
                      // barThickness: 30,
                      // maxBarThickness: 30,
                      // minBarLength: 30,
                    }
                  ]
                }
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Staatistics)
);
