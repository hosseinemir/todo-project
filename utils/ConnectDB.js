import mongoose from "mongoose";

export default async function ConnectDB(){
    if(mongoose.connections[0].readyState)return;

    try{
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.DB_URI)
    }catch(err){
        console.log(err)
    }
}