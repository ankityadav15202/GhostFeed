'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
export default function component (){
    const {data : session} = useSession()
    if(session){
        return (
            <>
                signed in as {session.user.email} <br/>
                <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }
    return(
        <>
            Not Signed in <br/>
            <button onClick={()=>signIn()}>Sign in</button>
        </>
    )
}