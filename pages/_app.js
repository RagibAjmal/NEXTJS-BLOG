import "../styles/global.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import Store from "../Components/Store";
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={Store}>
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
