import {z} from 'zod'

export const signInSchema = z.object({
    identifier : z.string(), // identifier is also known as username or email
    password : z.string()
})