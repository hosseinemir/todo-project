const testemail = value =>{
    const emailpatern=  /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailpatern.test(value)
}
const testpassword=value =>{
    if (value.trim().length < 8 || value.trim().length>40){
        return false
    }else{
        return true
    }
}
export {testemail,testpassword}