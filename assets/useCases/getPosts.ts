import { api } from "../api";

export async function getPosts(token: string) {
    try {
        const response = await api.get("/forum", {
            headers: {
                Authorization: `Bearer  ${token}`
            }
        })
    
        return response.data
    } catch (e) {
        console.log(e)
    }
}