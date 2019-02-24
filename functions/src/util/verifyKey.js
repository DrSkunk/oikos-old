import { firebase as admin } from "./index";

export default async function checkKey(req) {
  const key = req.body.key || req.query.key || req.headers["x-access-key"];
  // decode key
  if (!key) {
    throw new Error("No key provided");
  }
  const val = (await admin
    .database()
    .ref("/keys")
    .once("value")).val();
  const validKeys = Object.keys(val).map(item => val[item]);
  if (!validKeys.includes(key)) {
    throw new Error("Invalid key");
  }
  return true;
}
