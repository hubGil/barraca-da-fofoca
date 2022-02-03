import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getAutoComplete: async (query) => {
        let result = [];
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/auto-complete',
            params: { q: query },
            headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': '1e9b7d195cmshb669202f8842d16p1a42a2jsncaa10ba319cf'
            }
        };
        await axios.request(options).then(function (response) {
            result = response.data;
        }).catch(function (error) {
            console.error(error);
        });
        return result;
    },
    getAllNews: async (id) => {
        let result = [];
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/actors/get-all-news',
            params: {nconst: id},
            headers: {
              'x-rapidapi-host': 'imdb8.p.rapidapi.com',
              'x-rapidapi-key': '1e9b7d195cmshb669202f8842d16p1a42a2jsncaa10ba319cf'
            }
          };
        await axios.request(options).then(function (response) {
            result = response.data;
        }).catch(function (error) {
            console.error(error);
        });
        return result;
    }
}