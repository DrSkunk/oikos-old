import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import firebase from "../../util/firebase";
import Loading from "../../atoms/Loading";
import Board from "./Board";
import { getUsername, joinGame, leaveGame } from "../../util";

const styles = theme => ({
  root: {
    textAlign: "center"
  }
});

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: getUsername()
    };
    this.onTileClick = this.onTileClick.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const { gameId } = match.params;

    this.firebaseRef = firebase
      .database()
      .ref("games")
      .child(gameId);
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      const gameState = snap.val();
      this.setState({
        gameId,
        gameState,
        isLoading: false
      });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  onTileClick(tileIndex) {
    console.log("clicked on tile", tileIndex);
  }

  joinGame() {
    const { gameId, username } = this.state;
    this.setState({
      joinGameLoading: true
    });
    joinGame(username, gameId)
      .then(() => {
        console.log("success");
        this.setState({
          joinGameLoading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          joinGameLoading: false
        });
      });
  }

  leaveGame() {
    const { gameId, username } = this.state;
    this.setState({
      leaveGameLoading: true
    });
    leaveGame(username, gameId)
      .then(() => {
        console.log("success");
        this.setState({
          leaveGameLoading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          leaveGameLoading: false
        });
      });
  }

  render() {
    const { classes } = this.props;
    const {
      gameState,
      isLoading,
      username,
      joinGameLoading,
      leaveGameLoading
    } = this.state;

    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    const {
      board,
      name,
      players,
      currentPlayer,
      maxPlayers,
      inProgress
    } = gameState;
    const playerNames = players.join(", ");
    const currentPlayerName = players[currentPlayer];

    const isMyTurn = false;

    const playerIsInGame = players.includes(username);
    const gameIsFull = players.length === maxPlayers;

    return (
      <div className={classes.root}>
        <Typography component="h2" variant="display4" gutterBottom>
          {name}
        </Typography>
        <div>Player is in game: {playerIsInGame.toString()}</div>
        <div>Players: {playerNames}</div>
        <div>Current player: {currentPlayerName}</div>
        {!playerIsInGame && !gameIsFull && !inProgress ? (
          <div>
            <Button
              variant="contained"
              onClick={this.joinGame}
              disabled={joinGameLoading}
            >
              Join game
            </Button>
          </div>
        ) : null}
        {playerIsInGame && !inProgress ? (
          <div>
            <Button
              variant="contained"
              onClick={this.leaveGame}
              disabled={leaveGameLoading}
            >
              Leave game
            </Button>
          </div>
        ) : null}
        <Board
          board={board}
          isMyTurn={isMyTurn}
          onTileClick={this.onTileClick}
        />
        <Button to="/" component={Link} variant="contained">
          Back to overview
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Game);
