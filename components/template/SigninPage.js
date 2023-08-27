import styles from "./SignupPage.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { testemail, testpassword } from "@/validation/validationsignup";
import { signIn, useSession } from "next-auth/react";
export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [emailerr, setEmailerr] = useState(false);
  const [passerr, setPasserr] = useState(false);
  const [emoji, setemoji] = useState(true);
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);
  const checkinputs = () => {
    if (testemail(email)) {
      setEmailerr(false);
    } else {
      if (email === "") {
        setEmailerr(false);
      } else {
        setEmailerr(true);
      }
    }
    if (testpassword(password)) {
      setPasserr(false);
    } else {
      if (password === "") {
        setPasserr(false);
      } else {
        setPasserr(true);
      }
    }
  };
  useEffect(() => {
    checkinputs();
  }, [email, password]);
  useEffect(() => {
    if (emailerr || passerr) {
      setemoji(false);
    } else {
      setemoji(true);
    }
  }, [emailerr, passerr]);
  const signinhandler = async () => {
    if (testemail(email) && testpassword(password)) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res.error) router.push("/");
    } else {
      setEmailerr(true);
      setPasserr(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>Sign In!</h3>

        <input
          className={emailerr ? styles.inperr : null}
          type="text"
          name="email"
          placeholder=" your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.toLowerCase());
          }}
        />
        {emailerr ? <p>enter a valid email</p> : null}
        <input
          className={passerr ? styles.inperr : null}
          type="password"
          name="password"
          placeholder="chose a password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {passerr ? <p>enter a password 8 to 40 letter</p> : null}

        <button onClick={signinhandler}>Sign In {emoji ? ":)" : ":("} </button>

        <h3>
          Create an Acount? <Link href={"/signup"}>Sign Up</Link>
        </h3>
      </div>
    </div>
  );
}
