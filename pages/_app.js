import "../styles/globals.css";

import firebase from "firebase/app";

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
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
