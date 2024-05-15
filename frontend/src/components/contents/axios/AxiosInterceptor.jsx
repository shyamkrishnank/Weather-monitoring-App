import axios from "axios";

const token = localStorage.getItem('auth_token')? JSON.parse(localStorage.getItem('auth_token')).access:null



export const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/',
    headers:{
        'Authorization':token?`Bearer ${token}`:null,
        'Accept':'application/json',
    },
})

axiosInstance.interceptors.response.use((response)=>{
    if (response.status == 202){
        const token = response.data.tokens
        console.log(response.data)
        localStorage.setItem('auth_token',JSON.stringify(token))
        response.data.is_admin?localStorage.setItem('is_admin',response.data.is_admin):null
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.tokens.access}`
        return response
    }
    console.log(response)
    return response

},
(error)=>{
    if(error.response.status == 401){
        localStorage.removeItem('auth_token')
        axiosInstance.defaults.headers['Authorization'] = null
    }
        return Promise.reject(error)
}
)