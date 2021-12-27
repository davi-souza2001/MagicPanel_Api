import mongoose from 'mongoose'

async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT)
    console.log('Conectouu ao Mongoose')
}

main().catch((err) => console.log(err))

export default mongoose
