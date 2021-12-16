import mongoose from 'mongoose'
import dotenv from 'dotenv'

const dot = dotenv.config()

async function main(){
    await mongoose.connect(process.env.REACT_APP_MONGO_CONNECT)
    console.log('Conectouu ao Mongoose')
}

main().catch((err) => console.log(err))

export default mongoose