import styles from './ProfileDash.module.css'
export default function ProfileDash({data}) {
  return (
    <div className={styles.main}>
        <div className={styles.con}>
            <p>Name:</p>
            <p>{data.name}</p>
        </div>
        <div className={styles.con}>
            <p>Last Name:</p>
            <p>{data.lastname}</p>
        </div>
        <div className={styles.con}>
            <p>email:</p>
            <p>{data.email}</p>
        </div>
        <button className={styles.btn}>Edit</button>
      
    </div>
  );
}
