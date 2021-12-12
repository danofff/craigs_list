export default function makeHeader(user) {
  if (user) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
}
