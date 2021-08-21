import firebase from "firebase";
import fs from "fs";
import path from "path";
import Cert from "../../components/cert";
import GDSCCoreTeamCertification2021 from "../../components/cert/GDSCCoreTeamCertification2021";
import ReactDOMServer from 'react-dom/server';
const sharp = require("sharp")

export default function C(props) {
  return <Cert {...props}></Cert>;
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  const info = data.find((d) => d.id === id);

  const roundedCorners = Buffer.from(ReactDOMServer.renderToStaticMarkup(<GDSCCoreTeamCertification2021 {...info} />))
  sharp(roundedCorners)
  .png()
  .toFile(`${path.resolve("public/c/",id)}.png`)
  .catch(function(err) {
    console.log(err)
  })
  return { props: info };
}

export async function getStaticPaths() {
  var dir = 'public/c/';

if (!fs.existsSync(path.resolve(dir))){ 
    fs.mkdirSync(path.resolve(dir));
}

  const data = [];
  const paths = [];
  try {
    const db = firebase.firestore();
    var docRef = db.collectionGroup("core21");
    const querySnapshot = await docRef.get();
    querySnapshot.forEach((doc) => {
      paths.push({ params: { id: doc.id } });
      data.push({ id: doc.id, ...doc.data() });
    });
    if(paths.length === 0){
      throw "empty list"
    }
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));
  } catch (error) {
    console.log("Error getting document:", error);
    JSON.parse(fs.readFileSync(path.resolve("data.json"))).forEach((doc)=>{
      paths.push({ params: { id: doc.id } });
    });
  }
  return {
    paths,
    fallback: false,
  };
}
