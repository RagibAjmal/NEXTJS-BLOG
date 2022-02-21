import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function sample() {
  const { data: session } = useSession();
  const [month, setMonth] = useState(null);

  useEffect(() => {
    if (session) {
      axios
        .get(`http://localhost:8000/milk/sample`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })
        .then((res) => {
          setMonth(res.data);
        });
    }
  }, [session]);

  return <div>{month && month.toString()}</div>;
}
