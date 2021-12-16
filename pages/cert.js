import React from "react";
import Head from "next/head";

export default function CertPage() {

  return  typeof window !== "undefined" ? (
    <Head>
      <meta httpEquiv="refresh" content={`0; URL=/certificate?id=${window.location.pathname.split("/").pop()}`} />
    </Head>
  ):(
    <></>
  );
}
