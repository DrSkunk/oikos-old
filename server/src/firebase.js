import { https } from 'firebase-functions';

// Express Servers
import gameServer from './game';

// HTTP Cloud Functions
const game = https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return gameServer(request, response);
});

module.exports = {
  game
};
