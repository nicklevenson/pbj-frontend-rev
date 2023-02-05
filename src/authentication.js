import UserApi from "./api/user-api";

class Authentication {
  static loggedIn() {
    return sessionStorage.userId && sessionStorage.jwt;
  }

  static fetchUser() {
    return UserApi.fetchUser();
  }

  static logout() {
    sessionStorage.clear();
  }
}

export default Authentication;
