import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

class Loading extends Component {

  render() {
    const { classes, isLoading } = this.props;
    if(isLoading) {
      return <div>Loading ...<CircularProgress className={classes.progress} /></div>
    }
    return null;
  }
}

export default withStyles(styles)(Loading);
