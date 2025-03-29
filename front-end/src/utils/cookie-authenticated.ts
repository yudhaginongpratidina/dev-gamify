"use server"
import { cookies } from 'next/headers'

const setCookieAuthenticated = async (token: boolean) => {
    const cookieStore = cookies()
    ;(await cookieStore).set('authenticated', token.toString(), { 
        httpOnly: true, 
        secure: true 
    })
}

const getCookieAuthenticated = async () => {
    const cookieStore = cookies()
    return (await cookieStore).get('authenticated')
}

const removeCookieAuthenticated = async () => {
    const cookieStore = cookies()
    ;(await cookieStore).delete('authenticated')
}

export { setCookieAuthenticated, getCookieAuthenticated, removeCookieAuthenticated }