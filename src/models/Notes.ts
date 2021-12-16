import mongoose from '../db/conn'
const {Schema} = mongoose

const Notes = mongoose.model(
    'Notes',
    new Schema({
        note: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }, { timestamps: true })
)

export default Notes