
const token = localStorage.getItem('token');
export const https = Axios.create(
    {
        baseURL: 'http://localhost:8080/',
        headers:{
            Authorization: `Bearer ${token}`
        }
    }   
)