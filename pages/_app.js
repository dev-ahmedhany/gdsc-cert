import "../styles/globals.css";

import firebase from "firebase/app";
import Head from "next/head";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBZqkaBmfjETUStdKg10uIgv2ZGzygsBfo",
    authDomain: "gdsc-cert.firebaseapp.com",
    projectId: "gdsc-cert",
    storageBucket: "gdsc-cert.appspot.com",
    messagingSenderId: "320267466446",
    appId: "1:320267466446:web:d93aa68a990207677e029f",
    measurementId: "G-F8N65XRGYD",
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GDSC Certificates</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#845c5c" />
        <meta
          name="description"
          content="Google Developers Student Clubs Certificates app"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
