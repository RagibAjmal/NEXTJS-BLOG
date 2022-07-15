import { useRouter } from "next/router";
import styles from "../../../styles/signin.module.css";
import { useState } from "react";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";

export default function emailAuth() {
  const router = useRouter();
  const route = router.query.link;
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$"
  );
  const [inputs, setInputs] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!regex.test(inputs.password)) {
      console.log(
        "Password does not match requirements",
        inputs.password,
        regex.test(inputs.password)
      );
      toast.error(
        "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
      );
    } else {
      setLoading(true);

      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "auth/resetPassword/" +
        route[0] +
        "/" +
        route[1];

      axios
        .post(url, inputs)
        .then((res) => {
          setLoading(false);
          toast.success(res.data, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              Router.push("/auth/signin");
            },
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error("error", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className={styles.body}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.container}>
        <div className={styles.brandTitle}>Aruvadai Organic Store</div>
        <div className={styles.inputs}>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>New Password</label>
            <input
              required
              className={styles.input}
              name="password"
              placeholder="email@xyz.com"
              type="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <label className={styles.label}>Confirm New Password</label>
            <input
              required
              className={styles.input}
              type="password"
              placeholder="Min 6 charaters long"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              label=" "
              loading={loading}
              className={styles.button}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
