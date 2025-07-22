import axios  from "axios"

export const axiosInstance = axios.create({
    baseURL : 'https://linkup-e4dw.onrender.com/api',
    withCredentials:true
})

export default axiosInstance