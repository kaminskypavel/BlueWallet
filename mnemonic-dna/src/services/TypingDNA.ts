import axios from "axios"


export const createUser = async (userId: string, userTp: string) => {
    const res = await axios.post(`/users/${userId}`, {tp: userTp})
    console.log(res);
    return res;
}

export const verifyUser = async (userId: string, userTp: string) => {
    const res = await axios.post(`/users/verify/${userId}`, {tp: userTp})
    console.log(res);
    return res;
}
