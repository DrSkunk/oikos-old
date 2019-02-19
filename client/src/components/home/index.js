import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import firebase from '../../firebase';
import Loading from '../../atoms/Loading';
const styles = theme => ({
  root: {
  }
});


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      games: []
    }
    this.listGames = this.listGames.bind(this);
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref("games_list");
    this.firebaseCallback = this.firebaseRef
      .on("value", snap => {
        const games = snap.val();
        this.setState({
          games,
          isLoading: false
        })
      });
  }

  listGames() {
    const { games } = this.state;
    const gamesList = Object.keys(games).map(id => {
      const { maxPlayers, players, name } = games[id];
      const text = `${name} (${players.length}/${maxPlayers})`;
      // if(players.length === maxPlayers) {
      //   return <li key={id}>{text}</li>
      // }
      return <li key={id}><Link to={`game/${id}`}>{text}</Link></li>
    })
    return <ul>{gamesList}</ul>
  }

  render() {
    const { classes } = this.props;
    const { games, isLoading } = this.state;
    return <div className={classes.root}><Loading isLoading={isLoading} />{JSON.stringify(games)}
      {this.listGames()}
    </div>
  }
}

export default withStyles(styles)(Home);
