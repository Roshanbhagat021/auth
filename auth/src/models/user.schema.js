const {Schema,model}= require("mongoose")

const userSchema = new Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["Student","Admin"],default:"Student"}
})


const userModels = model("user",userSchema)

module.exports = userModels;