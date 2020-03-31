export default function verifyUsername(username) {
  if (username === undefined) {
    throw new Error('username not provided');
  }
  const firstLetterCapitalized = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  if (username.match(/^[a-z]+$/i) === null || firstLetterCapitalized !== username) {
    throw new Error('Invalid username');
  }
  return true;
}
