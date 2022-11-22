import axios from "axios";

// Setting up base Url for fetching data
const fetcher = axios.create({
    baseURL: "https://queries-ai-interview.herokuapp.com/api/v1",
    // baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`
    }
});
export default fetcher;
