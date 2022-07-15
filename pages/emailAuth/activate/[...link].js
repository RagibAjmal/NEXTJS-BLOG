import { useRouter } from "next/router";
import styles from "../../../styles/signin.module.css";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function emailAuth() {
  const router = useRouter();
  const route = router.query.link;
  const [response, setResponse] = useState("");

  if (route) {
    const url =
      process.env.BACKEND_URL + "auth/activate/" + route[0] + "/" + route[1];
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setResponse(err.data);
      });
  }
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.brandTitle}>Aruvadai Organic Store</div>
        <br />
        <label className={styles.label}>{response}</label>
        {response && (
          <div className={styles.Link}>
            <Link href="/auth/signin">
              <a>Sign In</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
