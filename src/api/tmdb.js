import axios from "axios";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        language: "ko-KR",
    },

});

export default tmdb;
