const express =require("express");
const BookController=require("./../controller/book.controller");

const router=express.Router();

router.post("/new-book",BookController.createBook);

module.exports=router;