import { firebase as admin } from '../util';

export default async function join(gameId, newPlayers) {
  await admin
    .database()
    .ref('/games')
    .child(gameId)
    .child('players')
    .set(newPlayers);

  await admin
    .database()
    .ref('/games_list')
    .child(gameId)
    .child('players')
    .set(newPlayers);
}
