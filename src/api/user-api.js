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

  static requestConnection = (requested_id) => {
    console.log("requesting connection");

    const request = $.ajax({
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${sessionStorage.userId}/request_connection`,
      data: JSON.stringify({ requested_id: requested_id }),
    });

    return request;
  };

  static acceptConnection = (requestingUserId) => {
    console.log("accepting connection");

    const request = $.ajax({
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${sessionStorage.userId}/accept_connection`,
      data: JSON.stringify({ requesting_user_id: requestingUserId }),
    });

    return request;
  };
}

export default UserApi;
