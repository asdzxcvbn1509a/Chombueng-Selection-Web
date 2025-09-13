import axios from "axios";

export const getListAllUser = async (token) => {
    // Code body
    return axios.get("https://chombueng-selection.vercel.app/api/users", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const changeStatusUser = async (token, value) => {
    // Code body
    return axios.post("https://chombueng-selection.vercel.app/api/change-status", value, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const changeRoleUser = async (token, value) => {
    // Code body
    return axios.post("https://chombueng-selection.vercel.app/api/change-role", value, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};