import $ from "jquery";

class ListsApi {
  static getInstrumentsAndGenres = () => {
    console.log("fetching tags");

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt} ${sessionStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/tags/instruments_and_genres`,
    });

    return request;
  };
}

export default ListsApi;
