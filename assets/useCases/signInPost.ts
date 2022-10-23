import { api } from "../api";

export async function signIn(registration: string, password: string) {
    try {
        const response = await api.post('/user/login', {
            pk: registration,
            sk: password
        }, {
            params: {
                typeUser: 'student'
            }
        })

        return response
    } catch (e) {
        console.log(e)
    }
    
}