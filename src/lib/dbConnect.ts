import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const Connection : ConnectionObject = {}


async function dbConnect(): Promise<void>{
    if (Connection.isConnected) {
        console.log('already connected to database')
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        Connection.isConnected =  db.connections[0].readyState
        
        console.log('db connected successfully...');
        
    } catch (error) {
        
        console.log('Database Connection Failed...', error)
        process.exit(1)
    }
}

export default dbConnect;


// re_fADCEvBg_D6M8MtPXJRFECuuGXNHzrPfk