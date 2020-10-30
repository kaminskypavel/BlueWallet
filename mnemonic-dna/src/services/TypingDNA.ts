import axios from "axios"


export const createUser = async (userId: string, userTp: string): Promise<void> => {
    const res = await axios.post(`/users/${userId}`, {tp: userTp})
    console.log(res);
}

export const verifyUser = async (userId: string, userTp: string): Promise<void> => {
    const res = await axios.post(`/users/verify/${userId}`, {tp: userTp})
    console.log(res);
}
