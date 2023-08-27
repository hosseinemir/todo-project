import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { CgProfile } from "react-icons/cg";
import ProfileInput from "../modules/ProfileInput";
import ProfileDash from "../modules/ProfileDash";
import { useRouter } from "next/router";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchprofile();
  }, []);
  const fetchprofile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastname) {
      setName(data.data.name);
      setLastName(data.data.lastname);
    }
  };
  const edithandler = async () => {
    
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, lastName, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") router.push("/profile");
  };
  return (
    <div className={styles.container}>
      <h4>
        <CgProfile /> Edit profile
      </h4>
      <ProfileInput
        name={name}
        lastName={lastName}
        password={password}
        setName={setName}
        setLastName={setLastName}
        setPassword={setPassword}
        submithandler={edithandler}
      />
    </div>
  );
}
