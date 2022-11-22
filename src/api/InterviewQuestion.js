//axios
import fetcher from "../helper/interviewAxios";

const GenerateInterviewQuestionsApi = async (body) => {
    return new Promise(function (resolve, reject) {
        fetcher.post("/interview-app/interview_questions/generate", body).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const SimilarQuestionsApi = async (body) => {
    return new Promise(function (resolve, reject) {
        fetcher.post("/interview-app/interview_questions/similar", body).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const AnswerInterviewQuestionsApi = async (body) => {
    return new Promise(function (resolve, reject) {
        fetcher.post("/interview-app/interview_questions/answer", body).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const ReviewAnswerApi = async (body) => {
    return new Promise(function (resolve, reject) {
        fetcher.post("/interview-app/interview_questions/review_answer", body).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const saveAnswerApi = async (body) => {
    return new Promise(function (resolve, reject) {
        fetcher.post("/interview-app/interview_questions/save", body).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const GetSaveData = async (props) => {
    return new Promise(function (resolve, reject) {
        fetcher.get(`/interview-app/interview_questions/get?populate=created_by&${props}`).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const getJobTitles = async (props) => {
    return new Promise(function (resolve, reject) {
        fetcher.get(`/interview-app/interview_questions/job_title_get?&${props}`).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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

const updateQuestionAnswer = async (props) => {
    return new Promise(function (resolve, reject) {
        fetcher.put(`/interview-app/interview_questions/update`, props).then((res) => {
            if (!res.data.sucess) {
                reject({
                    data: res.data,
                    other: res,
                    success: false
                });
            };
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
}
export {
    GenerateInterviewQuestionsApi,
    AnswerInterviewQuestionsApi,
    ReviewAnswerApi,
    SimilarQuestionsApi,
    saveAnswerApi,
    GetSaveData,
    getJobTitles,
    updateQuestionAnswer
}