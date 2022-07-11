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
          Signed in as {session.Token.userData.first_name}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
    return (
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.title}>Aruvadai Organic Store</div>
      <Signed></Signed>
      <Link href="/auth/signup">Sign Up</Link>
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
