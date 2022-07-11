import styles from "../../styles/signin.module.css";
import { useState } from "react";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Signin() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    axios
      .post(`http://localhost:8000/auth/forgotPassword/`, inputs)
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
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.brandTitle}>Aruvadai Organic Store</div>
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
        <div className={styles.inputs}>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Enter your Email</label>
            <input
              required
              className={styles.input}
              name="email"
              placeholder="email@xyz.com"
              type="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />

            <Button
              label=" "
              loading={loading}
              className={styles.button}
              type="submit"
            >
              Send Password Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
