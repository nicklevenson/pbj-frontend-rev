import Cookies from "js-cookie";
import UserApi from "./api/user-api";

class Authentication {
  static loggedIn() {
    return sessionStorage.userId && sessionStorage.jwt && Cookies.get("loggedIn");
  }

  static fetchUser() {
    return UserApi.fetchUser();
  }

  static logout() {
    sessionStorage.clear();
    Cookies.remove("loggedIn");
  }
}

export default Authentication;
