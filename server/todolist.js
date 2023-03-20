import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    text: {
        type: String
    }
    ,
    complete: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
});

const Todoserver = mongoose.model("Todo", TodoSchema);

export default Todoserver;
