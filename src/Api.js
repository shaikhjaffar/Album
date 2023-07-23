import axios from "axios";

const baseURl = "https://jsonplaceholder.typicode.com/albums";

const Albumservice = {
  getAllAlbum: function () {
    return axios.get(`${baseURl}`);
  },

  UpdateAlbum: function (id, data) {
    return axios.put(
      `${baseURl}/${id}`,
      {
        body: data,
      },
      {
        Headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
  },

  DeletAlbum: function (id) {
    return axios.delete(`${baseURl}/${id}`, {
      Headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  },
};

export { Albumservice };
