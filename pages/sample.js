import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function sample() {
  const ses = useSession();
  console.log(ses);
  return <div>hai</div>;
}
sample.auth = true;
