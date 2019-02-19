import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import firebase from '../../firebase';
import Loading from '../../atoms/Loading'
import Board from './Board';

const styles = theme => ({
  root: {
    textAlign: "center"
  }
});


class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.onTileClick = this.onTileClick.bind(this);
  }

  componentWillMount() {
    const { classes, match } = this.props;
    const { gameId } = match.params;
    this.firebaseRef = firebase.database().ref("games").child(gameId);
    this.firebaseCallback = this.firebaseRef
      .on("value", snap => {
        const gameState = snap.val();
        this.setState({
          gameState,
          isLoading: false
        })
      });
  }

  onTileClick(tileIndex) {
    console.log("clicked on tile", tileIndex)
  }

  render() {
    const { classes, } = this.props;
    const { gameState, isLoading } = this.state;

    if (isLoading) {
      return <Loading isLoading={isLoading} />
    }

    const { board, name, players, currentPlayer } = gameState;
    const playerNames = players.join(", ");
    // const playerNames = players.map((player, i) => <span key={`player_${i}`}>{player}</span>)
    const currentPlayerName = players[currentPlayer]

    const isMyTurn = false;

    return <div className={classes.root}>
      <Typography component="h2" variant="display4" gutterBottom>
        {name}
      </Typography>
      <div>Players: {playerNames}</div>
      <div>Current player: {currentPlayerName}</div>
      <Board board={board} isMyTurn={isMyTurn} onTileClick={this.onTileClick}></Board>
      <Link to="/">Back to overview</Link>
    </div>
  }
}

export default withStyles(styles)(Game);
