import React from "react";
import Button from "@material-ui/core/Button";
// import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Scroller from "./Scroller/Scroller";
import Modal from "./Modal";
import Snackbar from "./Snackbar";
import { styles } from "./styles";
const mapStateToProps = state => ({ ...state.landingReducer });

const mapDispatchToProps = dispatch => ({});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      username: "",
      password: "",
      snackbarOpen: false,
      modalOpen: false
    };
  }

  handleSnackBarClose = () => (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return this.setState(state => ({ snackbarOpen: !state.snackbarOpen }));
  };
  handleSnackBarOpen = () => {
    return this.setState(state => ({ snackbarOpen: !state.snackbarOpen }));
  };

  handleModal = () => this.setState(state => ({ modalOpen: !state.modalOpen }));

  handleChange = field => event => {
    return this.setState({ [field]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { scroll } = this.state;
    return (
      <React.Fragment>
        <Modal open={this.state.modalOpen} handleClose={this.handleModal} />
        <Snackbar
          open={this.state.snackbarOpen}
          onClose={this.handleSnackBarClose()}
          message={"Сообщение успешно отправлено"}
        />
        <div className={classes.wrapper}>
          <Scroller
            scrollRef={ref => (this.scroll = ref)}
            autoScroll={true}
            autoFrame={true}
            onScrollChange={scroll => this.setState({ scroll })}
          >
            
                <div className={classes.section}>
                  <div className={classes.navbar}>
                    <div className={classes.logo}>
                      <img src="/images/Logo.svg" alt="" />
                    </div>
                    <div className={classes.links}>
                      <ul className={classes.list}>
                        <li>
                          <Button
                            onClick={() =>
                              this.scroll.scrollToPosition(
                                scroll.children[1].start
                              )
                            }
                            className={classes.link}
                          >
                            Особенности
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={() =>
                              this.scroll.scrollToPosition(
                                scroll.children[5].start
                              )
                            }
                            className={classes.link}
                          >
                            Цены
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={() =>
                              this.scroll.scrollToPosition(
                                scroll.children[6].start
                              )
                            }
                            className={classes.link}
                          >
                            Контакты
                          </Button>
                        </li>
                      </ul>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={this.handleModal}
                      >
                        Начать бесплатно
                      </Button>
                    </div>
                  </div>

                  <div className={classes.contetWelcome}>
                    <Grid
                      container
                      spacing={32}
                      alignItems="center"
                      direction="row"
                      className={classes.container}
                      justify="center"
                    >
                      <Grid item xs={6}>
                        <div className={classes.textblock}>
                          <h2 className={classes.h2}>
                            Хотите увеличить{" "}
                            <span className={classes.highlight}>продажи</span>?
                          </h2>
                          <h3 className={classes.h3}>
                            Воспользуйтесь{" "}
                            <span className={classes.logotext}>
                              {" "}
                              <img
                                src="/images/Inline Logo.svg"
                                alt="FluentCRM logo"
                                className={classes.logotext}
                              />
                            </span>{" "}
                            для элементарного управления сделками с клиентами
                          </h3>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.pageButton}
                            onClick={this.handleModal}
                          >
                            Подробнее
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className={classes.imgblock}>
                          <img
                            src="/images/Dashboard.svg"
                            alt="FluentCRM Dashboard"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <div className={classes.contet}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.contentContainer}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img src="/images/Deal.svg" alt="FluentCRM Deal" />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          Заключайте{" "}
                          <span className={classes.highlight}>сделки</span>
                        </h2>
                        <h3 className={classes.h3}>
                          И следите за ними в единой системе, для того чтобы в
                          любой момент времени получить о них информацию
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.pageButton}
                          onClick={this.handleModal}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.contet}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.contentContainerSecondary}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          Ставьте{" "}
                          <span className={classes.highlight}>задачи</span>
                        </h2>
                        <h3 className={classes.h3}>
                          И отслеживайте их выполнение менеджерами
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.pageButton}
                          onClick={this.handleModal}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img src="/images/TaskImage.svg" alt="FluentCRM Deal" />
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.contet}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.contentContainer}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img
                          src="/images/CoopImage.svg"
                          alt="FluentCRM CoopImage"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          Заключайте{" "}
                          <span className={classes.highlight}>сделки</span>
                        </h2>
                        <h3 className={classes.h3}>
                          <span className={classes.logotext}>
                            {" "}
                            <img
                              src="/images/Inline Logo.svg"
                              alt="FluentCRM logo"
                              className={classes.logotext}
                            />
                          </span>{" "}
                          предназначена для работы с несколькими пользователями
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.pageButton}
                          onClick={this.handleModal}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.contet}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.contentContainerSecondary}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          Используйте{" "}
                          <span className={classes.highlight}>везде</span>
                        </h2>
                        <h3 className={classes.h3}>
                          <span className={classes.logotext}>
                            {" "}
                            <img
                              src="/images/Inline Logo.svg"
                              alt="FluentCRM logo"
                              className={classes.logotext}
                            />
                          </span>{" "}
                          приспособлена для использования на любых устройствах
                          от телефона до компьютера
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.pageButton}
                          onClick={this.handleModal}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img src="/images/TaskImage.svg" alt="FluentCRM Deal" />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.contet}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.contentContainer}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img
                          src="/images/Payment.svg"
                          alt="FluentCRM CoopImage"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          И все это{" "}
                          <span className={classes.highlight}>бесплатно</span>
                        </h2>
                        <h3 className={classes.h3}>
                          Все верно, для того чтобы пользоваться FluentCRM не
                          нужно платить ни копейки
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.pageButton}
                          onClick={this.handleModal}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.section}>
                  <Grid
                    container
                    spacing={32}
                    alignItems="center"
                    direction="row"
                    className={classes.container}
                    justify="center"
                  >
                    <Grid item xs={6}>
                      <div className={classes.textblock}>
                        <h2 className={classes.h2}>
                          Остались{" "}
                          <span className={classes.highlight}>вопросы</span>?
                        </h2>
                        <h3 className={classes.h3}>
                          Напишите нам и мы ответим Вам в ближайшее время.
                        </h3>
                        <form
                          className={classes.form}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="standard-name"
                            label="Имя"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange("name")}
                            margin="normal"
                          />
                          <TextField
                            id="standard-name"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange("email")}
                            margin="normal"
                            type="email"
                          />
                          <TextField
                            id="standard-multiline-flexible"
                            label="Сообщение"
                            multiline
                            rowsMax="4"
                            value={this.state.message}
                            onChange={this.handleChange("message")}
                            className={classes.textField}
                            margin="normal"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.pageButton}
                            onClick={this.handleSnackBarClose()}
                          >
                            Написать
                          </Button>
                        </form>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.imgblock}>
                        <img src="/images/ContactUs.svg" alt="FluentCRM Deal" />
                      </div>
                    </Grid>
                  </Grid>
                  <div className={classes.navbar}>
                    <div className={classes.logo}>
                      <img src="/images/Logo.svg" alt="" />
                    </div>
                    <div className={classes.links}>
                      <ul className={classes.list}>
                        <li>
                          <a
                            href="mailto: contact@fluentcrm.ru"
                            className={classes.link}
                          >
                            contact@fluentcrm.ru
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
          </Scroller>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Landing));
