export function getUsername() {
  const username = localStorage.getItem("username");

  if (username.match(/^[a-z]+$/i) === null) {
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
