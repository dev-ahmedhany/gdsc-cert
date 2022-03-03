import firebase from "firebase";
import fs from "fs";
import path from "path";
import Cert from "../../components/cert";
import GDSCCoreTeamCertification2021 from "../../components/cert/GDSCCoreTeamCertification2021";
import ReactDOMServer from "react-dom/server";
const sharp = require("sharp");
import Head from "next/head";

export default function C(props) {
  return (
    <>
      <Head>
        <title>{`${props.name} - GDSC Certificate`}</title>
        <meta
          name="description"
          content={`Google Develelopers Student Clubs Core Team 2020-2021 Certificate`}
        />
        <meta
          property="og:url"
          content={`https://gdsc-cert.web.app/c/${props.id}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${props.name} - GDSC Certificate`}
        />
        <meta
          property="og:description"
          content={`${props.name} - Google Develelopers Student Clubs Core Team 2020-2021 Certificate`}
        />
        <meta
          property="og:image"
          content={`https://gdsc-cert.web.app/c/${props.id}.png`}
        />
      </Head>
      <Cert {...props}></Cert>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  const info = data.find((d) => d.id === id);

  if (fs.existsSync(`${path.resolve("public/c/", id)}.png`)) {
    return { props: info };
  }

  const roundedCorners = Buffer.from(
    ReactDOMServer.renderToStaticMarkup(
      <GDSCCoreTeamCertification2021 {...info} />
    )
  );
  sharp(roundedCorners)
    .png()
    .toFile(`${path.resolve("public/c/", id)}.png`)
    .catch(function (err) {
      console.log(err);
    });
  return { props: info };
}

export async function getStaticPaths() {
  var dir = "public/c/";

  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }

  const data = [];
  const paths = [];

  // JSON.parse(fs.readFileSync(path.resolve("data.json"))).forEach((doc) => {
  //   paths.push({ params: { id: doc.id } });
  // });
  // return;
  try {
    const db = firebase.firestore();
    var docRef = db.collectionGroup("core21");
    const querySnapshot = await docRef.get();
    querySnapshot.forEach((doc) => {
      paths.push({ params: { id: doc.id } });
      data.push({ id: doc.id, ...doc.data() });
    });
    if (paths.length === 0) {
      throw "empty list";
    }
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));
  } catch (error) {
    console.log("Error getting document:", error);
    JSON.parse(fs.readFileSync(path.resolve("data.json"))).forEach((doc) => {
      paths.push({ params: { id: doc.id } });
    });
  }
  return {
    paths,
    fallback: false,
  };
}
