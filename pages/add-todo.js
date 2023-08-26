import AddTodoPage from "@/components/template/AddTodoPage";
import { getSession } from "next-auth/react";

export default function addtodo() {
  return (
    <>
      <AddTodoPage />
    </>
  );
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