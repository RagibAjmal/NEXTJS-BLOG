import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function Comp() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as <br />
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
}
