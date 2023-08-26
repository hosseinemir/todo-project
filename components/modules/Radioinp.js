import styles from "./Radioinp.module.css";

import React from "react";

export default function Radioinp({ value, title, status, setStatus ,children}) {
  return (
    <div className={styles.container}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}
