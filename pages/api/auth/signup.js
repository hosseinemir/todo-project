import TodoUser from "@/models/TodoUser";
import { hashPassword } from "@/utils/Auth";
import ConnectDB from "@/utils/ConnectDB";

import { testemail } from "@/validation/validationsignup";
export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await ConnectDB();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "err on connect to db",
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ status: "failed", message: "email or password not exist" });
  }


  const emailvalidation = testemail(email);

  if (!emailvalidation) {
    return res
      .status(401)
      .json({ status: "failed", message: "not valid email" });
  }
  const existinguser =await TodoUser.findOne({email : email})
  if(existinguser){
    return res.status(401).json({status:"failed",message:"useralredy exist"})
  }
  const hashedpassword = await hashPassword(password)
  const newuser =await TodoUser.create({email:email,password:hashedpassword})
  return res.status(201).json({status:"success",message:"user added successfuly"})


}
