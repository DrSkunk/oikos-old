import { https } from "firebase-functions";
import { firebase as admin, getGameState } from "../util";
const cors = require("cors")({
  origin: true
});

export default https.onRequest(async (req, res) => {
  console.log("leaveGame", req.query);
  return cors(req, res, async () => {
    try {
      const { username, gameId } = req.query;

      const gameState = await getGameState(gameId);

      if (gameState === null) {
        throw new Error("Invalid gameId");
      }
      const { players: playersObject } = gameState;

      const players = Object.values(playersObject);

      if (!players.includes(username)) {
        throw new Error("Player is not in game");
      }

      const usernameIndex = players.indexOf(username);

      const newPlayers = [
        ...players.slice(0, usernameIndex),
        ...players.slice(usernameIndex + 1, players.length)
      ];

      console.log("newplayers", newPlayers);

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
      return res.status(500).send(error.toString());
    }
  });
});
