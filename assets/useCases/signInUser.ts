import { setCookie } from "nookies"

export function signInUser(token: string) {
    setCookie(undefined, 'loginauth.token', token), {
        maxAge: 60 * 60 * 1
    }
}