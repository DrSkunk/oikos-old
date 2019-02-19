import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
  }
});


class PageNotFound extends Component {

  state = {
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>404 - page not found</div>
  }
}

export default withStyles(styles)(PageNotFound);