import axios from "axios";
import { userLocalStorage } from "./LocalService";

const token = userLocalStorage?.get()?.token;
export const BASE_URL_IMG = "http://localhost:8080/public/img/prds/";
export const https = axios.create(
    {
        baseURL: 'http://localhost:8080/',
        headers:{
            Authorization: `Bearer ${token}`
        }
    }   
)