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
        .get(`https://infinite-eyrie-81096.herokuapp.com/milk/sample`, {
          headers: {
            Authorization: `Bearer ${session.Token}`,
          },
        })
        .then((res) => {
          setMonth(res.data);
        });
    }
  }, [session]);

  return (
    <div>
      {month && month.toString()}
      <div>
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
    props: { Token: session.accessToken },
  };
}
