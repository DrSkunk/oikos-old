import cors from 'cors';
import express from 'express';

import join from './join';
import { verifyUsername, getGameState } from '../util';

const app = express();
app.use(
  cors({
    origin: true
  })
);

app.get('/test', join);

app.get('/join', [
  verifyUsername,
  (req, res, next) => {
    const { gameId } = req.query;

    try {
      getGameState(gameId).then(gameState => {
        console.log('gamestate', gameState);

        if (gameState === null) {
          next(new Error('Invalid gameId'));
        }

        const { players, maxPlayers } = gameState;
        if (players.includes(username)) {
          next(new Error('Player already joined game'));
        }

        if (players.length === maxPlayers) {
          next(new Error('Game is full'));
        }

        const newPlayers = [...players, username];
        join(gameId, newPlayers)
          .then(() => next())
          .catch(error => {
            next(error);
          });
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error.message);
    }
    return res.sendStatus(200);
  }
]);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

export default app;
