import $ from "jquery";

class UserApi {
  static fetchUser = () => {
    console.log("fetching user");
    const userId = sessionStorage.userId;

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
    });

    return request;
  };
}

export default UserApi;
