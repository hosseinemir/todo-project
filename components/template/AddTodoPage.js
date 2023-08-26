import styles from "./AddTodoPage.module.css";
import Radioinp from "../modules/Radioinp";
import { useState } from "react";
// import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addtodohandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("todo added !");
    }else{
        toast.error("not added")
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.todocon}>
        <h3>Add your todo ;)</h3>
        <div className={styles.title}>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <button className={styles.btn} onClick={addtodohandler}>
            Add todo
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
