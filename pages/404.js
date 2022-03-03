import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";
import Cert from "../components/cert";

export default function CertPage() {
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [value, setValue] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.location.pathname.split("/"));
      if (
        window.location.pathname.split("/").length === 2 &&
        window.location.pathname.split("/")[0] == "c"
      ) {
        const id = window.location.pathname.split("/")[1];
        setID(id);
        firebase
          .firestore()
          .collection("cert")
          .doc(id.substring(0, 2))
          .collection("core21")
          .doc(id)
          .get()
          .then((doc) => {
            setValue(doc.data());
            setLoading(false);
          });
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }
  }, []);

  return loading ? (
    <>Loading...</>
  ) : notFound ? (
    <>404</>
  ) : value ? (
    <Cert id={id} {...value} />
  ) : (
    <Head>
      <meta httpEquiv="refresh" content={`0; URL=/validate/${id}`} />
    </Head>
  );
}
