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

  static fetchUserRecs = () => {
    console.log("fetching user recs");
    const userId = sessionStorage.userId;

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/recommended_users`,
    });

    return request;
  };

  static fetchSupportingInfo = (id) => {
    console.log("fetching supporting info");

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${sessionStorage.userId}/get_supporting_info/${id}`,
    });

    return request;
  };
}

export default UserApi;
