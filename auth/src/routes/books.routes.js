const { Router } = require("express");
const BookModel = require("../models/book.schema");
const auth = require("../middleware/auth");
const acess = require("../middleware/acess");

const bookRouter = Router();

bookRouter.get("/", auth,acess(["Student","Admin"]), async (req, res) => {
  try {
    const allbooks = await BookModel.find();
    res.json({ book: allbooks });
    
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Error:", error);
  }
});

bookRouter.post("/", auth,acess(["Admin"]), async (req, res) => {
  try {
    const newbook = new BookModel(req.body)
    newbook.save()
    res.status(201).send("New book added successfull")

  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Error:", error);
  }
});

module.exports = bookRouter;
