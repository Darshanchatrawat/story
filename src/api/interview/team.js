import axios from "axios";
import { config } from "../../assets/config/config";

const apiUrl = config.api.url

const getTeamById = async (teamId) => {
    return new Promise(function (resolve, reject) {
        axios.get(`${apiUrl}/v1/team/${teamId}`).then((res) => {
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

const addUserInTeam = async ({ teamId, body }) => {
    return new Promise(function (resolve, reject) {
        axios.post(`${apiUrl}/v1/team/${teamId}/addUser`, body).then((res) => {
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


const deleteUserInTeam = async (teamId,userId) => {
    return new Promise(function (resolve, reject) {
        axios.delete(`${apiUrl}/v1/team/${teamId}/user/${userId}`).then((res) => {
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
    getTeamById,
    addUserInTeam,
    deleteUserInTeam
}