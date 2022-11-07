import UserApi from "./api/user-api";

class Authentication {
  static loggedIn() {
    return sessionStorage.userId && sessionStorage.jwt;
  }

  static fetchUser() {
    return UserApi.fetchUser();
  }
}

export default Authentication;
