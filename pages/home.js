import { getSession } from "next-auth/react";
import { useEffect } from "react";
import styles from "../styles/home.module.css";

export default function Home(pageProps) {
  const products = [
    { key: "1", name: "salt", price: 1 },
    { key: "2", name: "sugar", price: 2 },
    { key: "3", name: "coffee", price: 3 },
  ];
  useEffect(() => {}, []);
  return (
    <div>
      <div className={styles.products}>
        {products.map((product) => {
          return (
            <div className={styles.product} key={product.key}>
              {product.name}
            </div>
          );
        })}
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
