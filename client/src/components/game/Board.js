import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Simple from './Simple';
import Shape from './Shape';

const styles = theme => ({
  root: {
    display: 'grid'
    // marginLeft: "25vw",
    // gridTemplateColumns: "10vw 10vw 10vw 10vw 10vw",
    // gridTemplateRows: "10vw 10vw 10vw 10vw 10vw"
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2def2',
    '&:hover': {
      backgroundColor: '#ccc'
    }
  }
});

class Board extends Component {
  render() {
    const { classes, board, onTileClick } = this.props;
    const { players, roofs, towers } = board;

    const boardGrid = players.map((player, index) => {
      const roof = roofs[index];
      const tower = towers[index];
      return (
        <div
          key={`boardgrid_cell_${index}`}
          className={classes.cell}
          onClick={() => {
            onTileClick(index);
          }}
        >
          player {player}
          <br />
          roof {roof}
          <br />
          tower {tower}
        </div>
      );
    });

    return (
      <div className={classes.root}>
        {/* <Simple /> */}
        <Shape />
        {/* {boardGrid} */}
      </div>
    );
  }
}

export default withStyles(styles)(Board);
