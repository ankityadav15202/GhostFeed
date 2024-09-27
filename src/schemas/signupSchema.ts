import {z} from 'zod'

export const usernameValidation = z.string().min(2, "UserName must be atleast two characters").max(20,"Not more than 20 charaacters").regex(/^[a-zA-Z0-9_]+$/,"Username must note contain special charaters")


export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({
        message : "invalid email address"
    }),
    password : z.string().min(6,{message : "Minimum 6 characters required"}),
    
})