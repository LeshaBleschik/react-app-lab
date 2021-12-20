export function setUser(name: string) {
  return {
    type: "SET_USER",
    payload: name,
  }
}

export function removeUser() {
  return {
    type: "REMOVE_USER",
  }
}
