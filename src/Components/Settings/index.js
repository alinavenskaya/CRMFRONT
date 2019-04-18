import ListErrors from '../ListErrors'
import React from 'react'
import agent from '../../agent'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
  GOAL_CREATED
} from '../../constants/actionTypes'
import TextField from '@material-ui/core/TextField'

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
class SettingsForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    }

    this.updateState = (field) => (ev) => {
      return this.setState({ [field]: ev.target.value })
    }

    this.submitForm = (ev) => {
      ev.preventDefault()
      const { password, ...user } = { ...this.state }
      return this.props.onSubmitForm(user)
    }
  }

  componentWillMount () {
    if (this.props.currentUser) {
      this.setState({
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      })
    }
  }
  render () {
    const { classes } = this.props
    return (
      <form onSubmit={this.submitForm} className={classes.form}>
        <TextField
          id='avatar-url'
          label='URL аватара'
          className={classes.textField}
          value={this.state.image}
          onChange={this.updateState('image')}
          margin='normal'
          variant='filled'
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='name'
          label='ФИО'
          className={classes.textField}
          value={this.state.username}
          onChange={this.updateState('username')}
          margin='normal'
          variant='filled'
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          id='info'
          label='Краткая информация о себе'
          className={classes.textField}
          value={this.state.bio}
          onChange={this.updateState('bio')}
          margin='normal'
          variant='filled'
          multiline
          rows={8}
        />
        <TextField
          id='password'
          label='Новый пароль'
          className={classes.textField}
          value={this.state.password}
          onChange={this.updateState('password')}
          margin='normal'
          variant='filled'
          type='password'
          InputLabelProps={{ shrink: true }}
        />
        <Button color='primary' disabled={this.props.inProgress} type='submit'>
          Обновить настройки
        </Button>
      </form>
    )
  }
}

const SettingsFormWrapper = withStyles(styles, { withTheme: true })(
  SettingsForm
)

class Goals extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      goal: ''
    }

    this.updateState = (field) => (ev) => {
      return this.setState({ [field]: ev.target.value })
    }

    this.submitForm = (ev) => {
      ev.preventDefault()
      const { goal } = this.state
      return this.props.onSubmitForm({
        goalvalue: goal,
        goaldate: Date.now(),
        goaltype: 'Цель на месяц'
      })
    }
  }
  render () {
    const { classes } = this.props
    return (
      <form onSubmit={this.submitForm} className={classes.form}>
        <TextField
          id='goal'
          label='goal'
          className={classes.textField}
          value={this.state.username}
          onChange={this.updateState('goal')}
          margin='normal'
          variant='filled'
          InputLabelProps={{ shrink: true }}
        />
        <Button color='primary' disabled={this.props.inProgress} type='submit'>
          Поставить новую цель
        </Button>
      </form>
    )
  }
}

const GoalsWrapper = withStyles(styles)(Goals)
const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
  onSubmitGoal: (goal) =>
    dispatch({ type: GOAL_CREATED, payload: agent.Goals.create(goal) })
})

class Settings extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <h2 className={classes.h2}>Ваши настройки</h2>
          <Paper className={classes.root} elevation={1}>
            <ListErrors errors={this.props.errors} />
            <SettingsFormWrapper
              currentUser={this.props.currentUser}
              onSubmitForm={this.props.onSubmitForm}
            />
          </Paper>
        </div>
        <div className={classes.innerContainer}>
          <h2 className={classes.h2}>Финансовые цели</h2>
          <Paper className={classes.root} elevation={1}>
            <GoalsWrapper onSubmitGoal={this.props.onSubmitForm} />
          </Paper>
        </div>
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
