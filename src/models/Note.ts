import mongoose from '../db/conn'
const {Schema} = mongoose

const Note = mongoose.model(
    'Note',
    new Schema({
        note: {
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        favorite:{
            type: Boolean,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }, { timestamps: true })
)

export default Note