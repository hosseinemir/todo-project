import Link from "next/link";
import styles from "./Layout.module.css";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useState } from "react";

export default function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const menuhandler = (change) => {
    if (change === "open") {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>TXg TodoApp</p>
      </header>

      <aside className={menu ? styles.asideopen : styles.asideclose}>
        <div className={styles.asidecon}>
          <p>do it easy 👋 </p>
          <ul>
            <li>
              <VscListSelection />
              <Link href={"/"}>todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href={"/add-todo"}>add todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href={"/"}>profile</Link>
            </li>
          </ul>
        </div>
        <div className={styles.arrow}>
          {!menu ? (
            <BsFillArrowRightCircleFill onClick={() => menuhandler("open")} />
          ) : (
            <BsFillArrowLeftCircleFill onClick={() => menuhandler("close")} />
          )}
        </div>
      </aside>
      <section className={styles.section}>{children}</section>
    </div>
  );
}
