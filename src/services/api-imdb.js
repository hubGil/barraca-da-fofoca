import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

const apiImdb = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com",
  withCredentials: false,
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "5506b3f4demshf9c8218eea992ddp1b2390jsn59b2537af677",
  },
});

export default {
  getAutoComplete(id) {
    return apiImdb.get("/auto-complete", { params: { q: id } });
  },

  getAllNews(id) {
    return apiImdb.get("/actors/get-all-news", { params: { nconst: id } });
  },
  getAboutInfo(id) {
    return apiImdb.get("/actors/get-bio", { params: { nconst: id } });
  },
};
