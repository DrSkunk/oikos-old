import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import createHistory from "history/createBrowserHistory";
import Home from "./components/home";
import Game from "./components/game";
import PageNotFound from "./components/PageNotFound";

const styles = theme => ({
  root: {
    color: "green"
  }
});

const history = createHistory();

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router history={history}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/game/:gameId" component={Game} />
              <Route exact path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
