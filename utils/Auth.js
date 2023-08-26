import { hash,compare } from "bcryptjs";

async function hashPassword (password){
    const hashedpassword= await hash(password,12)
    return hashedpassword

}
async function verifypassword(passsword , hashedpassword){
    const isvalid = compare(passsword,hashedpassword)
    return isvalid
}
export{hashPassword,verifypassword}