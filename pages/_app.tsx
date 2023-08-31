import Head from "next/head";
import Layout from "../Core/Layout";
import { wrapper } from "../Core/Redux/store";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';

// Style
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
