import styles from "./Task.module.css";
import React from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
export default function Task({ data, color, next, back, fetchtodo }) {
  const changestatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.status === "success") fetchtodo();
  };
  return (
    <div className={styles.container}>
      {data?.map((item) => (
        <div key={item._id} className={styles.todocon}>
          <div className={`${styles.span} ${color}`}></div>
          <RiMastodonLine />
          <h3>{item.title}</h3>
          <div className={`${color}btn`}>
            {back ? (
              <button
                className={styles.backbtn}
                onClick={() => changestatus(item._id, back)}
              >
                <BiLeftArrow />
                back
              </button>
            ) : null}
            {next ? (
              <button
                className={styles.nextbtn}
                onClick={() => changestatus(item._id, next)}
              >
                next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
