import Cookies from "js-cookie";
import UserApi from "./api/user-api";

class Authentication {
  static loggedIn() {
    return localStorage.userId && localStorage.jwt && Cookies.get("loggedIn");
  }

  static fetchUser() {
    return UserApi.fetchUser();
  }

  static logout() {
    localStorage.clear();
    Cookies.remove("loggedIn");
  }
}

export default Authentication;
