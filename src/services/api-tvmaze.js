import axios from "axios";

const API_KEY = '5506b3f4demshf9c8218eea992ddp1b2390jsn59b2537af677';

// https://rapidapi.com/tvjan/api/tvmaze/
const apiTvmaze = axios.create({
  baseURL: "https://tvjan-tvmaze-v1.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "tvjan-tvmaze-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
});

// https://rapidapi.com/machaao-inc-machaao-inc-default/api/newsx/
const apiNewsx = axios.create({
  baseURL: "https://newsx.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "newsx.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
});

export default {
  searchPersonName(name) {
    return apiTvmaze.get("/search/people", { params: { q: name } });
  },

  getPersonData(id) {
    return apiTvmaze.get("/people/" + id);
  },

  getPersonNews(name) {
    return apiNewsx.get("/search", { params: { q: name, limit: 10 } });
  },

};
