import { firebase as admin } from "./index";

export default async function getGameState(gameId) {
  const snapshot = await admin
    .database()
    .ref("/games")
    .child(gameId)
    .once("value");
  return snapshot.val();
}
