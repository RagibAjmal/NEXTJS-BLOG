import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function About() {
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    axios
      .get("http://localhost:8000/milk/sample/", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
      .then((res) => {
        setabout(res.data);
      });
  }, []);

  return (
    <div className="container">
      <h1>About</h1>
    </div>
  );
}
