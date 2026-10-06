import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
    baseURL: `${apiBaseUrl}/auth`,
    withCredentials: true,
});

export async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username,
            password,
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getMe(){
    try{
        const response = await api.get("/get-me")
        return response.data
    }catch(err){
        console.error(err);
        throw err;
    }
}