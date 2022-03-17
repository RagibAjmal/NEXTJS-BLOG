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
  const [activeItem, setActiveItem] = useState("Home");
  const basicItems = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
  const basicItemTemplate = (item, options) => {
    const className = classNames("scroll-item p-2", {
      odd: options.odd,
    });
    const style =
      options.props.orientation === "horizontal"
        ? {
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }
        : {
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          };

    return (
      <div className={className} style={style}>
        {item}
      </div>
    );
  };
  return (
    <>
      {route === "/" ? (
        <div>{pageProps.children}</div>
      ) : (
        <div className={styles.container}>
          <Head>
            <title>Test</title>
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
                        : { backgroundColor: "var(--surface-a)" }
                    }
                  >
                    <button onClick={() => setActiveItem("Home")}>
                      <Link href="/">Home</Link>
                    </button>
                  </div>
                </li>
                <li className={styles.li}>
                  <div
                    className={styles.Menu}
                    style={
                      activeItem == "PrimeReact"
                        ? { backgroundColor: "var(--surface-ground)" }
                        : { backgroundColor: "var(--surface-a)" }
                    }
                  >
                    <button onClick={() => setActiveItem("PrimeReact")}>
                      <Link href="/primereact">Prime React</Link>
                    </button>
                  </div>
                </li>
                <li className={styles.liright}>
                  <div
                    className={styles.Menu}
                    style={
                      activeItem == "About"
                        ? { backgroundColor: "var(--surface-ground)" }
                        : { backgroundColor: "var(--surface-a)" }
                    }
                  >
                    <button onClick={() => setActiveItem("About")}>
                      <Link href="/about">About </Link>
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            {/* <div className={styles.NavBarFlex}>
          <div className={styles.NavBarFlex1}>
            <div className={styles.Menu}>
              <Link href="/">Home</Link>
            </div>
            <div className={styles.Menu}>
              <Link href="/">Home</Link>
            </div>
          </div>
          <div className={styles.NavBarFlex2}>
            <div className={styles.Menu}>
              <Link href="/">Home</Link>
            </div>
          </div>
  </div>*/}
          </div>
          <div className={styles.items}>
            <VirtualScroller
              className={styles.VirtualScroller}
              items={basicItems}
              itemSize={50}
              itemTemplate={basicItemTemplate}
            />
            {pageProps.children}
          </div>

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
