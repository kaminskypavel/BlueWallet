import axios from "axios"


export const createUser = async (userId: string, userTp: string) => {
    const {data} = await axios.post(`/users/${userId}`, {tp: userTp})
    console.log(data);
    return data;
}

export const verifyUser = async (userId: string, userTp: string) => {
    const {data} = await axios.post(`/users/verify/${userId}`, {tp: userTp})
    console.log(data);
    return data;
}

export const enrollPattern = (userId: string, userTp: string) => createUser(userId, userTp)
