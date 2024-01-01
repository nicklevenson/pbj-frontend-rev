import $ from "jquery";

class ListsApi {
  static getTagList = () => {
    console.log("fetching tags");

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/tags`,
    });

    return request;
  };
}

export default ListsApi;
