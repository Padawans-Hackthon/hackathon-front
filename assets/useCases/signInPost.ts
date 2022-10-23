import { api } from "../api";

export async function signIn(registration: string, password: string, type: boolean) {
    let typeUser = "student"

    if (type) {
        typeUser = "teacher"
    }

    try {
        const response = await api.post('/user/login', {
            pk: registration,
            sk: password
        }, {
            params: {
                typeUser
            }
        })

        return response
    } catch (e) {
        console.log(e)
    }
    
}