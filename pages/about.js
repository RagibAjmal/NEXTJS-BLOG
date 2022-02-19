import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function About() {
  const [about, setabout] = useState("");
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoic2xpZGluZyIsImV4cCI6MTY0NDkzOTcxNywiaWF0IjoxNjQ0OTM5NDE3LCJqdGkiOiI5OWEyZmU3MmEzOTI0ZjhkYmI1NWRkY2Y0ZDdiNzlmZiIsInJlZnJlc2hfZXhwIjoxNjQ1MDI1ODE3LCJ1c2VyX2lkIjoxfQ.5iosHhaN2nGjeu810cFsXZV5LhqcqUqv5zZ24sur7Q8";
  useEffect(() => {
    axios
      .get("http://localhost:8000/milk/month/", {
        headers: { Authorization: `Bearer ${token}` },
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
