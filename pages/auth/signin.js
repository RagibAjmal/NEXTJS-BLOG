import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import styles from "../../styles/signin.module.css";
import { Button } from "primereact/button";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import Link from "next/link";

const Signin = ({ csrfToken, providers }) => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.brandTitle}>Aruvadai Organic Store</div>
        <div className={styles.inputs}>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <label className={styles.label}>Email ID</label>
            <input
              required
              className={styles.input}
              name="email"
              placeholder="email@xyz.com"
              type="email"
            />
            <label className={styles.label}>Password</label>
            <input
              required
              className={styles.input}
              type="password"
              placeholder="Min 6 charaters long"
              name="password"
            />
            <Button type="submit" className={styles.button}>
              Login
            </Button>
          </form>
          <div className={styles.Link}>
            <Link href="/auth/forgotPassword">
              <a>Forgot Password?</a>
            </Link>
          </div>
          <p className={styles.center}>or connect with</p>
          <div className={styles.center}>
            <FcGoogle
              className={styles.icon}
              size={70}
              onClick={() => signIn(providers.google.id)}
            ></FcGoogle>
            <GrGithub
              className={styles.icon}
              size={70}
              onClick={() => signIn(providers.github.id)}
            ></GrGithub>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
