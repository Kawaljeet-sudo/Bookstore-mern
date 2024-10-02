import express from "express";
import { mongoDBURL } from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute  from './routes/bookRoutes.js';
import cors from 'cors';
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req,res) => {
    return res.status(234).send('Welcome to mern')    
})

app.use('/books',booksRoute)


mongoose.connect(mongoDBURL).then(() => {
    console.log("app connected to database")
    app.listen(PORT,() => {
        console.log("app is listening to port 8080")
    })
}).catch((error) => {
    console.log(error);
})

