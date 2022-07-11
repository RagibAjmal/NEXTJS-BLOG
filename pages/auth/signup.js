import styles from "../../styles/signup.module.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function signUp() {
  const [inputs, setInputs] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$"
  );
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

      axios.post(`http://localhost:8000/auth/signup/`, inputs).then((res) => {
        setLoading(false);
        if (res.data === "ok") {
          toast.success(
            "Your Account has been created succesfully!! Please check your email to confirm your email address in order to activate your account.",
            {
              position: "top-center",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                Router.push("/");
              },
            }
          );
        } else {
          toast.error(res.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.brandTitle}>Aruvadai Organic Store</div>
        <div className={styles.inputs}>
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
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>First Name</label>
            <input
              required
              className={styles.input}
              type="text"
              placeholder="Ragib"
              name="first_name"
              value={inputs.first_name || ""}
              onChange={handleChange}
            />

            <label className={styles.label}>Last Name</label>
            <input
              required
              className={styles.input}
              type="text"
              placeholder="Ajmal"
              name="last_name"
              value={inputs.last_name || ""}
              onChange={handleChange}
            />

            <label className={styles.label}>EMAIL</label>
            <input
              required
              className={styles.input}
              type="email"
              placeholder="example@test.com"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            <label className={styles.label}>PASSWORD</label>
            <input
              required
              className={styles.input}
              type="password"
              placeholder="Min 8 charaters long"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <label className={styles.label}>CONFIRM PASSWORD</label>
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
              Create an Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
