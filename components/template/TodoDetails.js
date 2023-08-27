import styles from "./TodoDetails.module.css"

export default function TodoDetails({data,edithandler}) {
  return (
    <div className={styles.container}>
      <div className={styles.con}>
      <p>Todo Title : {data.title}</p>
        <p>Todo Status : {data.status}</p>
        <p>Todo Detaild : {data.details}</p>
        <button className={styles.btn} onClick={edithandler}>Edit Todo</button>
      </div>
        
    </div>
  )
}
