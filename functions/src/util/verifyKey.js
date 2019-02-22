import { firebase as admin } from "./index";

export default async function checkKey(req) {
  const key = req.body.key || req.query.key || req.headers["x-access-key"];
  // decode key
  if (!key) {
    throw new Error("No key provided");
  }
  const snapshot = await admin
    .database()
    .ref("/keys")
    .once("value");
  if (!Object.values(snapshot.val()).includes(key)) {
    throw new Error("Invalid key");
  }
  return true;
}
