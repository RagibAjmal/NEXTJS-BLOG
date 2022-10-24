import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";

export default function sample(session) {
  const [month, setMonth] = useState(null);
  console.log(session);

  useEffect(() => {
    if (session) {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "milk/sample/", {
          headers: {
            Authorization: `Bearer ${session.Token.accessToken}`,
          },
        })
        .then((res) => {
          setMonth(res.data);
        });
    }
  }, [session]);

  return (
    <div>
      <div>
        <h4>This feature is under development.</h4>
        <Calendar inline></Calendar>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { Token: session },
  };
}
