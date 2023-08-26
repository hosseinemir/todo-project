import styles from "./ProfileInput.module.css";
export default function ProfileInput({
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  submithandler,
}) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.btn} onClick={submithandler}>Submit :)</button>
    </div>
  );
}
