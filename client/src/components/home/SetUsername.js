import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUsername, setUsername } from "../../util";

const styles = theme => ({
  error: {
    color: theme.palette.error.dark
  }
});

class SetUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      error: false,
      username: ""
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({ username: getUsername() });
  }

  handleClickOpen = () => {
    this.setState({ open: true, error: false });
  };

  handleClose() {
    const { username } = this.state;
    if (setUsername(username)) {
      this.setState({ open: false });
      this.props.callback();
    } else {
      this.setState({ error: true });
    }
  }

  updateInputValue(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    const { username, error } = this.state;

    let errorMessage = null;
    if (error) {
      errorMessage = (
        <span className={classes.error}>
          Invalid name! No spaces, numbers or special characters are allowed!
        </span>
      );
    }

    return (
      <div className={classes.root}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Username</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Which username do you choose on your quest to crush your enemies?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              text="test"
              value={username}
              onChange={evt => this.updateInputValue(evt)}
              fullWidth
            />
            <DialogContentText>{errorMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SetUsername);
