const {Schema,model}= require("mongoose");


const bookSchema= new Schema ({
    title:{type:String,required:true},
    author:{type:String,required:true},
    availableCopies:{type:Number,default:1},
    totalCopies:{type:Number,default:1},
    publishDate:{type:Date}
})


const BookModel = model("books",bookSchema)


module.exports = BookModel;