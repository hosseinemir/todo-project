import styles from "./AddTodoPage.module.css"

import Radioinp from "../modules/Radioinp";
import { useEffect, useState } from "react";
// import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EditTodoPage({todoId}) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [details, setdatails] = useState("");
    const router=useRouter()
    useEffect(() => {
        fetchtodo();
      }, []);
      const fetchtodo = async () => {
        const res = await fetch(`/api/todos/${todoId}`);
        const data = await res.json();
        if (data.status !== "success") router.replace("/");
        setTitle(data.data.title);
        setStatus(data.data.status);
        setdatails(data.data.details);
      };
    const edittodohandler = async () => {
      const res = await fetch(`/api/todos/${todoId}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title,status,details})
      })
      const data = await res.json()
      if(data.status === "success")router.push("/")
    };
  return (
    <div className={styles.container}>
    <div className={styles.todocon}>
      <h3>Edits your todo ;)</h3>
      <div className={styles.title}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.title}>
        <label htmlFor="details">Details:</label>
        <textarea
          type="text"
          name="details"
          value={details}
          onChange={(e) => setdatails(e.target.value)}
        />
      </div>
      <div className={styles.status}>
        <Radioinp
          value="todo"
          setStatus={setStatus}
          title=" Todo"
          status={status}
        >
          <BsAlignStart />
        </Radioinp>
        <Radioinp
          value="inProgress"
          setStatus={setStatus}
          title=" In Progress"
          status={status}
        >
          <FiSettings />
        </Radioinp>
        <Radioinp
          value="review"
          setStatus={setStatus}
          title=" Review"
          status={status}
        >
          <AiOutlineFileSearch />
        </Radioinp>
        <Radioinp
          value="done"
          setStatus={setStatus}
          title=" Done"
          status={status}
        >
          <MdDoneAll />
        </Radioinp>
        <button className={styles.btn} onClick={edittodohandler}>
          Submit Change
        </button>
      </div>
      <ToastContainer />
    </div>
  </div>
  )
}
