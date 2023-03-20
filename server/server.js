import { MongoClient } from "mongodb";
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import Todoserver from './todolist.js';

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// const connectionString = "mongodb://127.0.0.1:27017";
// console.log("------- Start connecting to MongDB -------");
// export const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// create an object to keep MongoClient ก็คือ ข้อมูลที่ได้จาก client จะถูกเก็บไว้ใน object โดยคำสั่ง new
mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error())

app.get('/todos', async (req, res) => {
    const todos = await Todoserver.find()
    res.json(todos)
})

app.post('/todos/new', async (req, res) => {
    const todo = new Todoserver({
        text: req.body.text
    });
    todo.save()
    res.json(todo)
});
// Todoserver.push({
//     ...req.body,
// })

// return res.json({
//     message: "SSS"
// })

app.delete('/todos/delete/:id', async (req, res) => {
    const deleted = await Todoserver.findByIdAndDelete(req.params.id)
    res.json(deleted)
})

app.put('/todos/complete/:id', async (req, res) => {
    const edit = await Todoserver.findById(req.params.id);

    edit.complete = !edit.complete;

    edit.save()

    res.json(edit)
})

app.listen(port, () => {
    console.log("Server started on port 5000");
})
