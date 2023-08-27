import EditTodoPage from "@/components/template/EditTodoPage";
import { useRouter } from "next/router";
import {getSession} from 'next-auth/react'

export default function Edittodo() {
    const router = useRouter()
    const {todoId}=router.query;

  return (
    <>
    <EditTodoPage todoId={todoId}/>
    </>
  )
}
export async function  getServerSideProps({req}){
  const session = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination:"/signin",
        permanent:false
      }
    }
  }
  return {
    props:{}
  }

}