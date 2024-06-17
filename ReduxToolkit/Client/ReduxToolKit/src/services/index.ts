import axiosInstance from "../axiosInstance";

export async function getAllUser() {
    const response = await axiosInstance.get('get-all-user')
    return response
}