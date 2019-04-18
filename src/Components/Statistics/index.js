import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { HorizontalBar } from 'react-chartjs-2'
import Grid from '@material-ui/core/Grid'
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../../constants/actionTypes'
import Widget from './Widget'

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  h2: {
    fontWeight: 'normal'
  },
  innerContainer: {
    width: 600
  }
})

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
})

class Settings extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Grid
          container
          spacing={32}
          alignItems='center'
          direction='row'
          className={classes.container}
          justify='center'
        >
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Первый контакт',
                data: {
                  count: 5,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 7200 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Назначена встреча',
                data: {
                  count: 8,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 9899 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Отправлено КП',
                data: {
                  count: 1,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 800 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Выслан договор',
                data: {
                  count: 0,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 0 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Исполнение обязанностей',
                data: {
                  count: 20,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 30500 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Widget
              widget={{
                title: 'Успех',
                data: {
                  count: 5,
                  label: 'Сделок',
                  extra: { label: 'Сумма', count: 67000 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: 'Просроченные задачи',
                data: {
                  count: 25,
                  label: 'задач',
                  extra: { label: 'Процент от всех', count: 7 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: 'Задачи к выполнению',
                data: {
                  count: 5,
                  label: 'задач',
                  extra: { label: 'Процент от всех', count: 2 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: 'Выполненные задачи',
                data: {
                  count: 2,
                  label: 'задач',
                  extra: { label: 'Процент от всех', count: 3 }
                }
              }}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Widget
              widget={{
                title: 'Сделок без задач',
                data: {
                  count: 10,
                  label: 'задач',
                  extra: { label: 'Процент от всех', count: 1 }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <HorizontalBar
              height='30'
              data={{
                labels: ['Прибыль', 'План'],
                datasets: [
                  {
                    // borderWidth: 10,
                    // label: "My First dataset",
                    // fill: false,
                    // lineTension: 0.1,
                    backgroundColor: ['#00e676', '#03a9f4'],
                    // borderColor: "rgba(75,192,192,1)",
                    // borderCapStyle: "butt",
                    // borderDashOffset: 0.0,
                    // borderJoinStyle: "miter",
                    // pointBorderColor: "rgba(75,192,192,1)",
                    // pointBackgroundColor: "#fff",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 1,
                    data: [145000, 100000, 0]
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
                  text: 'Цель'
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
    )
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
)
