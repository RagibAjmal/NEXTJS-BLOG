import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import styles from "../styles/index.module.css";
import Link from "next/link";

export default function Index(session) {
  const Signed = () => {
    if (session.Token !== null) {
      return (
        <>
          You have Logged in
          <br />
          <button onClick={() => signOut()}>Click here to Sign out</button>
        </>
      );
    }
    return (
      <div>
        This is a demo E-Commerce App for Authentication. Please{" "}
        <Link href="/auth/signin">Sign In </Link>/{" "}
        <Link href="/auth/signup">Sign Up </Link>
        to visit the Application <br />
      </div>
    );
  };

  return (
    <div className={styles.backGround}>
      <div className={styles.customShapeDivider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles.shapeFill}
          ></path>
        </svg>
      </div>
      <div className={styles.title}>Aruvadai Organic Store</div>
      <div className={styles.signIn}>
        <Signed></Signed>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: { Token: null },
    };
  }
  return {
    props: { Token: session },
  };
}
