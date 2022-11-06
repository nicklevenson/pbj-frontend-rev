class Authentication {
  static loggedIn() {
    return sessionStorage.userId && sessionStorage.jwt;
  }

  static fetchUser() {}
}
