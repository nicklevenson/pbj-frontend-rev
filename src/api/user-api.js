class UserApi {
  static fetchUser = () => {
    console.log("fetching user");
    const userId = sessionStorage.userId;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch(function (error) {
        console.warn("error getting user: \n", error);
      });
  };
}

export default UserApi;
