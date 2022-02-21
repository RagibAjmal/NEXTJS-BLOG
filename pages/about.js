import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function About() {
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    console.log("test");
    if (loading) {
      const { data } = await axios.get("/api/sample", {
        withCredentials: true,
      });
      console.log(data, "111");
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="container">
      <h1>About</h1>
    </div>
  );
}
