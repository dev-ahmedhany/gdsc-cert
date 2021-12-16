import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";
import Cert from "../components/cert";

export default function CertPage() {
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
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
    }
  }, []);

  const [width, setWidth] = useState(300);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth * 0.9);
    }
  }, []);

  return loading ? (
    <>Loading...</>
  ) : value ? (
    <Cert id={id} {...value} />
  ) : (
    <Head>
      <meta httpEquiv="refresh" content={`0; URL=/validate/${id}`} />
    </Head>
  );
}
