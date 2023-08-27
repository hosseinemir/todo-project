import TodoUser from "@/models/TodoUser";
import ConnectDB from "@/utils/ConnectDB";
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
  const { todoId } = req.query;

  if (req.method === "GET") {
    const todo = user.todos.find((todo) => todo._id.valueOf() === todoId);
    if (!todo) {
      return res
        .status(404)
        .json({ status: "failed", message: "todo dosent exsit" });
    }
    return res.status(200).json({ status: "success", data: todo });
  } else if (req.method === "DELETE") {
    const todoindex = user.todos.findIndex(
      (todo) => todo._id.valueOf() === todoId
    );
    user.todos.splice(todoindex, 1);
    user.save();

    return res.status(200).json({ status: "success" });
  } else if (req.method === "PATCH") {
    const { title, status, details } = req.body;
    const result = await TodoUser.updateOne(
      { "todos._id": todoId },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.status": status,
          "todos.$.details": details,
        },
      }
    );
    return res.status(200).json({ status: "success", message: "done" });
  }
  //   console.log(todoId)
  //   return res.status(200).json({status:"success"})
}
