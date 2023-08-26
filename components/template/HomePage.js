import Task from "../modules/Task";
import styles from "./HomePage.module.css";

import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const fetchtodo = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") {
      setTodos(data.data);
    }
  };
  useEffect(() => {
    fetchtodo();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.todocon}>
        <p>Todo</p>
        <Task data={todos.todo} color='todo1' fetchtodo={fetchtodo} next="inProgress" />
      </div>
      <div className={styles.inprocon}>
        <p>In Progress</p>
        <Task data={todos.inProgress} color='todo2' fetchtodo={fetchtodo} next="review" back="todo"/>
      </div>
      <div className={styles.reviewcon}>
        <p>Review</p>
        <Task data={todos.review} color='todo3' fetchtodo={fetchtodo} next="done" back="inProgress"/>
      </div>
      <div className={styles.donecon}>
        <p>Done</p>
        <Task data={todos.done} color='todo4' fetchtodo={fetchtodo}  back="review"/>
      </div>
    </div>
  );
}
