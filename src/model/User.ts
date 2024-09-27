import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}


const MessageSchema: Schema<Message> = new Schema({
    content :{
        type : String,
        required : true
    },
    createdAt:{
        type : Date,
        required : true,
        default : Date.now
    }
})


export interface User extends Document{
    username : string;
    email : string;
    password: string;
    verifyCode : string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingMessage : boolean;
    messages : Message[];
}

const UserSchema : Schema<User> = new Schema({
    username : {
        type : String,
        required : [true, "Username required"], //if the username is not entered then the error message "Username required" will be shown
        trim:  true,
        unique : true
    },
    email : {
        type : String,
        required : [true, "email required"], //if the email is not entered then the error message "email required" will be shown
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "please use a valid email address"]
    },
    password:{
        type : String,
        required : [true, "password required"]
    },
    verifyCode  : {
        type : String,
        required : [true, "verification code required"]
    },
    verifyCodeExpiry : {
        type : Date,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceptingMessage : {
        type : Boolean,
        default : true
    },
    messages : [MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default  UserModel;