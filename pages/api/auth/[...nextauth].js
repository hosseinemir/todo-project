import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import TodoUser from "@/models/TodoUser";
import { verifypassword } from "@/utils/Auth";
import ConnectDB from "@/utils/ConnectDB";

const authOptions = {
  session:{strategy:"jwt"},
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await ConnectDB();
        } catch (err) {
          throw new Error("err in connect to db");
        }
        if (!email || !password) {
          throw new Error("invalid data");
        }
        const user = await TodoUser.findOne({ email: email });
        if (!user) throw new Error("user dosent exist");
        const isvalid = await verifypassword(password, user.password);
        if (!isvalid) throw new Error("username or password is incorrect!");
        return { email };
      },
    }),
  ],secret: process.env.SECRET_KEY,
};

export default NextAuth(authOptions);
