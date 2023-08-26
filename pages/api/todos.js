import TodoUser from "@/models/TodoUser";
import ConnectDB from "@/utils/ConnectDB";
import { SortData } from "@/utils/SortData";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "err on connect to db",
    });
  }

  const session = await getSession({ req });
  
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "user dosent loged in" });
  }
  const user = await TodoUser.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user dosent exsit" });
  }
  if (req.method === "POST") {
    const { title, status } = req.body;
    if (!title || !status) {
      return res
        .status(401)
        .json({ status: "failed", message: "invalid data" });
    }
    user.todos.push({title,status});
    user.save()
  return res.status(201).json({ status: "success", message: "todo add succesfuly" });

  }else if(req.method=== "GET"){
    const sortdata = SortData(user.todos)
    return res.status(200).json({status:"success",data:sortdata})
  }else if(req.method === "PATCH"){
    const {id,status}=req.body;

    if(!id||!status){
      return res.status(422).json({status:"failed",message:"invalid data"})
    }
    const result = await TodoUser.updateOne({"todos._id":id},{$set:{"todos.$.status":status}})

    return res.status(200).json({status:"success",message:"done"})

  }
  
}
