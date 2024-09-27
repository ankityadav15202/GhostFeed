import {z} from 'zod'

export const MessageSchema = z.object({
    content : z.string()
    .min(10,{message : "containt must be atleat of 10 characters"})
    .max(300,{message : 'content must be no langer than 300 characters'})
})