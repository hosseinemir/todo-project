import { Schema,model,models } from "mongoose";

const todouserschema= new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:40
    },
    name:String,
    lastname:String,
    createdAt:{
        type:Date,
        default: ()=> Date.now(),
        immutable:true,
    },
    todos:[{title:String,status:String}]

})


const TodoUser= models.TodoUser || model("TodoUser",todouserschema)

export default TodoUser