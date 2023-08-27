import TodoDetails from "@/components/template/TodoDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
export default function Todoid() {
  const [data, setData] = useState("");
  const router = useRouter();
  const { todoId } = router.query;
  useEffect(() => {
    fetchtodo();
  }, []);
  const fetchtodo = async () => {
    const res = await fetch(`/api/todos/${todoId}`);
    const data = await res.json();
    if (data.status !== "success") router.replace("/");
    setData(data.data);
  };
  const edithandler = ()=>{
    router.push(`/edit/${todoId}`)
  }
  return (
    <>
      <TodoDetails data={data} edithandler={edithandler} />
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