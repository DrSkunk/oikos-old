import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import firebase from "../../util/firebase";
import Loading from "../../atoms/Loading";
import SetUsername from "./SetUsername";
import { getUsername } from "../../util";

const styles = theme => ({
  root: {}
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      games: [],
      username: null
    };
    this.listGames = this.listGames.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref("games_list");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      const games = snap.val();
      this.setState({
        games,
        isLoading: false,
        username: getUsername()
      });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  listGames() {
    const { games } = this.state;
    const gamesList = Object.keys(games).map(id => {
      const { maxPlayers, players, name } = games[id];
      const text = `${name} (${players.length}/${maxPlayers})`;
      // if(players.length === maxPlayers) {
      //   return <li key={id}>{text}</li>
      // }
      return (
        <li key={id}>
          <Link to={`game/${id}`}>{text}</Link>
        </li>
      );
    });
    return <ul>{gamesList}</ul>;
  }

  changeUsername() {
    this.setState({
      username: null
    });
  }

  updateUsername() {
    this.setState({
      username: getUsername()
    });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, username } = this.state;
    if (isLoading) {
      return (
        <div className={classes.root}>
          <Loading isLoading={isLoading} />
        </div>
      );
    }
    // if (name === null) {
    //   name
    // }
    console.log("uesrname", username);
    return (
      <div className={classes.root}>
        {username ? (
          <span>
            Hello {username}
            <Button variant="contained" onClick={this.changeUsername}>
              Change username
            </Button>
          </span>
        ) : (
          <SetUsername callback={this.updateUsername} />
        )}
        {this.listGames()}
      </div>
    );
  }
}

export default withStyles(styles)(Home);
