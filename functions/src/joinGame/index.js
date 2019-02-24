import { https } from "firebase-functions";
import { firebase as admin, getGameState, verifyUsername } from "../util";
const cors = require("cors")({
  origin: true
});

export default https.onRequest(async (req, res) => {
  console.log("joinGame", req.query);
  return cors(req, res, async () => {
    try {
      const { username, gameId } = req.query;

      if (username === undefined) {
        throw new Error("username not provided");
      }
      verifyUsername(username);

      const gameState = await getGameState(gameId);

      console.log("gamestate", gameState);

      if (gameState === null) {
        throw new Error("Invalid gameId");
      }

      const { players, maxPlayers } = gameState;
      if (players.includes(username)) {
        throw new Error("Player already joined game");
      }

      if (players.length === maxPlayers) {
        throw new Error("Game is full");
      }

      const newPlayers = [...players, username];

      console.log("newPlayers", newPlayers);

      await admin
        .database()
        .ref("/games")
        .child(gameId)
        .child("players")
        .set(newPlayers);

      await admin
        .database()
        .ref("/games_list")
        .child(gameId)
        .child("players")
        .set(newPlayers);

      return res.sendStatus(200);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.toString());
    }
  });
});
