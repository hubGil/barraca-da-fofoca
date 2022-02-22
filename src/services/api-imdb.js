import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

const apiImdb = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  withCredentials: false,
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "1e9b7d195cmshb669202f8842d16p1a42a2jsncaa10ba319cf",
  },
});

export default {
  getAutoComplete(id) {
    return apiImdb.get("/auto-complete", { params: { q: id } });
  },

  getAllNews(id) {
    return apiImdb.get("/actors/get-all-news", { params: { nconst: id } });
  },
  getFamousInfo(id) {
    return apiImdb.get("/actors/get-bio", { params: { nconst: id } });
  },
};
