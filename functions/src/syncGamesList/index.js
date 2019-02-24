import { https } from "firebase-functions";
import { firebase as admin, getGameState, verifyKey } from "../util";

export default https.onRequest(async (req, res) => {
  console.log("syncGamesList");
  try {
    await verifyKey(req);

    const games = (await admin
      .database()
      .ref("/games")
      .once("value")).val();

    Object.keys(games).forEach(async id => {
      const { players, maxPlayers, name } = games[id];
      await admin
        .database()
        .ref("/games_list")
        .child(id)
        .set({ maxPlayers, name, players });
    });

    console.log(games);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});
