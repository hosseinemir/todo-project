import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import { CgProfile } from "react-icons/cg";
import ProfileInput from "../modules/ProfileInput";
import ProfileDash from "../modules/ProfileDash";
export default function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data,setData]=useState(null)
  useEffect(() => {
    fetchprofile();
  }, []);
  const fetchprofile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    console.log(data)
    if(data.status === "success" && data.data.name && data.data.lastname){
      setData(data.data)
    }
  };
  const submithandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, lastName, password }),
    });
    const data = await res.json();
    
  };
  return (
    <div className={styles.container}>
      <h4>
        <CgProfile /> profile
      </h4>
      {data?(<ProfileDash data={data}/>):(<ProfileInput
        name={name}
        lastName={lastName}
        password={password}
        setName={setName}
        setLastName={setLastName}
        setPassword={setPassword}
        submithandler={submithandler}
      />)}
      
    </div>
  );
}
