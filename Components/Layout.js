import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/layout.module.css";
import { classNames } from "primereact/utils";
import { VirtualScroller } from "primereact/virtualscroller";
import { useRouter } from "next/router";

export default function Layout(pageProps) {
  const router = useRouter();
  const route = router.pathname;
  const regex = new RegExp("/store/*");
  const path = regex.test(route);

  const [activeItem, setActiveItem] = useState("Home");

  return (
    <>
      {!path ? (
        <div>{pageProps.children}</div>
      ) : (
        <div className={styles.container}>
          <Head>
            <title>Aruvadai Organic Store</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={styles.Layout}>
            <div className={styles.NavBar}>
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <div
                    className={styles.Menu}
                    style={
                      activeItem == "Home"
                        ? { backgroundColor: "var(--surface-ground)" }
                        : { backgroundColor: "var(--primary-color)" }
                    }
                  >
                    <button onClick={() => setActiveItem("Home")}>
                      <Link href="/store/sample">Home</Link>
                    </button>
                  </div>
                </li>
                <li className={styles.liright}>
                  <div
                    className={styles.Menu}
                    style={
                      activeItem == "PrimeReact"
                        ? { backgroundColor: "var(--surface-ground)" }
                        : { backgroundColor: "var(--primary-color)" }
                    }
                  >
                    <button onClick={() => setActiveItem("PrimeReact")}>
                      <Link href="/store/cart">Cart</Link>
                    </button>
                  </div>
                </li>
                <li className={styles.liright}>
                  <div
                    className={styles.Menu}
                    style={
                      activeItem == "About"
                        ? { backgroundColor: "var(--surface-ground)" }
                        : { backgroundColor: "var(--primary-color)" }
                    }
                  >
                    <button onClick={() => setActiveItem("About")}>
                      <Link href="/store/milk">Milk</Link>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {pageProps.children}
          <footer>
            <div className={styles.footer}>
              <div className={styles.footerItems}>
                <i className="pi pi-github"> </i>
                <span>Github</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
