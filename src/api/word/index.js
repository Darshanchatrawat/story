import axios from "axios";
import { config } from "../../assets/config/config";

const apiUrl = config.api.url

const tableWord = async () => {
    return new Promise(function (resolve, reject) {
        axios.get(`${apiUrl}/v1/app/word-analytics/table`).then((res) => {
            resolve({
                data: res.data,
                other: res,
                success: true
            });
        }).catch((err) => {
            reject({
                data: err.response?.data,
                other: err,
                success: false
            });
        })
    })
};

export {
    tableWord,
}