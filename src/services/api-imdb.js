import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

const apiImdb = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  withCredentials: false,
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "1ccd003fc9mshc2c488609b1e0f9p18a975jsn6decbebe03ba",
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
