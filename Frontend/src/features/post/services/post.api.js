import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

export async function getFeed() {
    const response = await api.get("/posts/feed");
    return response.data;
}

export async function createPost(imageFile, caption) {
    const formData = new FormData();

    formData.append("profileImage", imageFile);
    formData.append("caption", caption);

    const response = await api.post("/posts", formData);

    return response.data
}

export async function likePost(postId){
    const response = await api.post("/posts/like/"+ postId)
    return response.data
}

export async function unLikePost(postId){
    const response = await api.post("/posts/unlike/"+ postId)
    return response.data
}