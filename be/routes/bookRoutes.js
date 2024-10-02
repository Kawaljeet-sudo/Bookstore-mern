import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

//route for saving a book
router.post('/', async (req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({'message':'all fields required'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)

        return res.status(200).send(book)
        
    }catch(error){
        console.log(error)
        return res.status(500).send({'message': error.message })
    }
})

//route for get all books from database
router.get('/', async (req,res) => {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books,
        })
    }catch(error){
        return res.status(500).send({'message': error.message })
    }
})

//route for get book by id
router.get('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id)
        return res.status(200).json(book)
    }catch(error){
        return res.status(500).send({'message': error.message })
    }
})

//update book by id
router.put('/:id', async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({'message':'all fields required'})
        }
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if(!book){
            return res.status(404).json({'message':'Book Not Found'})
        }

        return res.status(200).send({'message':'Book Updated Successfully'})

    }catch(error){
        return res.status(500).send({'message': error.message })
    }
})

//delete book by id
router.delete('/:id', async(req,res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: 'Book Not Found'})
        }
        return res.status(200).send({message: 'Book Deleted Sucessfully'})
    }catch(error){
        return res.status(500).send({message: error.message })
    }
})

export default router;