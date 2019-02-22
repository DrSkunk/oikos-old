import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    textAlign: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class PageNotFound extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <div>404 - page not found</div>
          <Link to="/">Back to overview</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PageNotFound);
