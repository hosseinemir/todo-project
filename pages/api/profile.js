import { getSession } from "next-auth/react";
import ConnectDB from "@/utils/ConnectDB";
import TodoUser from "@/models/TodoUser";
import { verifypassword } from "@/utils/Auth";

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
    const { name, lastName, password } = req.body;
    const isvalid = await verifypassword(password, user.password);
    if (!isvalid) {
      return res
        .status(422)
        .json({ status: "failed", message: "wrong password" });
    }
    user.name = name;
    user.lastname = lastName;
    user.save();
    return res.status(200).json({
      status: "success",
      message: "data updated!",
      data:{name,lastName,email:session.user.email}
    });
  }else if(req.method === "GET"){
    return res.status(200).json({status:"success",data:{name:user.name ,lastname:user.lastname,email:user.email}})
  }
}
