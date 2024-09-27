// import { NextAuthOptions } from "next-auth";
// import bcrypt from "bcryptjs"
// import { CredentialsProvider } from "next-auth/providers/credentials"; // Import the type correctly
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import { error } from "console";


// export const authOption : NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             credentials: {
//               email: { label: "Email", type: "text" },
//               password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials : any): Promise<any>{
//                 await dbConnect()

//                 try {
//                     const user = await UserModel.findOne({
//                         $or : [
//                             {email : credentials.identifier},
//                             {username : credentials.identifier}
//                         ]
//                     })

//                     if(!user){
//                         throw new Error("No user found with this email")
//                     }   

//                     if(!user.isVerified){
//                         throw new Error("Please verify your account before login")
//                     }   

//                     const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
//                     if(isPasswordCorrect){
//                         return user
//                     }
//                     else{
//                         throw new Error("Incorrect username or password")
//                     }
//                 } catch (error : any) {
//                     throw new Error(error.message || "Authentication failed")
//                 }
//             }
//         })
//     ]
// }



import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials"; // Correct import
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user; // Return the user on successful authentication
          } else {
            throw new Error("Incorrect username or password");
          }
        } catch (err: any) {
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks : {
    async session({session, token}){
      const customToken = token as {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string;
      };

      if (customToken) {
        session.user._id = customToken._id;
        session.user.isVerified = customToken.isVerified;
        session.user.isAcceptingMessage = customToken.isAcceptingMessage;
        session.user.username = customToken.username;
      }

      return session
    },
    async jwt({token, user}){
      
      if(user){
        token._id = user._id?.toString()
        token.isVerified = user.isVerified
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username; 
      }
      return token
    }
  },
  pages: {
    signIn : '/sign-in'
  },
  session: {
    strategy : 'jwt'
  },
  secret : process.env.NEXTAUTH_SECRET,
  
};
