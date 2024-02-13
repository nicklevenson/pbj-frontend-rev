import $ from "jquery";

class UserApi {
  static fetchUser = () => {
    console.log("fetching user");
    const userId = localStorage.userId;

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
    });

    return request;
  };

  static fetchUserRecs = (filters = {}) => {
    console.log("fetching user recs");
    const userId = localStorage.userId;
    const range = filters.range ? `range=${filters.range}&` : "";
    const instruments = filters.instruments
      ? filters.instruments.map((i) => `instruments[]=${i}&`).join("")
      : "";
    const genres = filters.genres
      ? filters.genres.map((i) => `genres[]=${i}&`).join("")
      : "";

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/recommended_users?${range}${instruments}${genres}`,
    });

    return request;
  };

  static fetchSupportingInfo = (id) => {
    console.log("fetching supporting info");

    const request = $.ajax({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.userId}/get_supporting_info/${id}`,
    });

    return request;
  };

  static requestConnection = (requested_id) => {
    console.log("requesting connection");

    const request = $.ajax({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.userId}/request_connection`,
      data: JSON.stringify({ requested_id: requested_id }),
    });

    return request;
  };

  static acceptConnection = (requestingUserId) => {
    console.log("accepting connection");

    const request = $.ajax({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.userId}/accept_connection`,
      data: JSON.stringify({ requesting_user_id: requestingUserId }),
    });

    return request;
  };

  static updateTag = (name, kind, action) => {
    console.log("updating tag");

    const request = $.ajax({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.userId}/update_tag`,
      data: JSON.stringify({ name: name, kind: kind, update_type: action }),
    });

    return request;
  }

  static updateUser = (newValues) => {
    console.log("updating user");

    let values = {
      bio: newValues.bio,
      username: newValues.username,
      location: newValues.location,
      lat: newValues.lat,
      lng: newValues.lng,
      incognito: newValues.incognito,
      social_links_attributes: [
        {
          type: "spotify",
          url: newValues.spotifyLink,
        },
        {
          type: "soundcloud",
          url: newValues.soundcloudLink,
        },
        {
          type: "bandcamp",
          url: newValues.bandcampLink,
        },
        {
          type: "instagram",
          url: newValues.instagramLink,
        },
        {
          type: "apple_music",
          url: newValues.appleMusicLink,
        }
      ]
    };

    values = Object.keys(values).filter((key) => values[key] !== null && values[key] !== "" && values[key] !== undefined)
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }
        , {});
    
    if (Object.keys(values).length === 0) {
      return;
    }

    const social_links_attributes = values.social_links_attributes.filter((link) => link.url !== null && link.url !== "" && link.url !== undefined);

    values.social_links_attributes = social_links_attributes;
  
    const request = $.ajax({
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.jwt} ${localStorage.userId}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.userId}`,
      data: JSON.stringify({ user: values }),
    });

    return request;
  }
}

export default UserApi;
