export function getUsername() {
  const username = localStorage.getItem("username");

  if (username === null || username.match(/^[a-z]+$/i) === null) {
    localStorage.clear("username");
    return null;
  }
  return username;
}

export function setUsername(username) {
  const firstLetterCapitalized =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  if (firstLetterCapitalized.match(/^[a-z]+$/i) === null) {
    return false;
  }
  localStorage.setItem("username", firstLetterCapitalized);
  return true;
}

// const baseUrl = "http://localhost:5000/oikos-game/us-central1/";
const baseUrl = "https://us-central1-oikos-game.cloudfunctions.net/";

export function joinGame(username, gameId) {
  return fetch(`${baseUrl}joinGame?username=${username}&gameId=${gameId}`);
}

export function leaveGame(username, gameId) {
  return fetch(`${baseUrl}leaveGame?username=${username}&gameId=${gameId}`);
}
