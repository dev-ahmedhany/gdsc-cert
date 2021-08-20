import firebase from "firebase";
import fs from "fs";
import path from "path";
import Cert from "../../components/cert";

export default function C(props) {
  return <Cert {...props}></Cert>;
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  const info = data.find((d) => d.id === id);

  if (info) {
    return { props: info };
  } else {
    const db = firebase.firestore();

    var docRef = db
      .collection("cert")
      .doc(id.substring(0, 2))
      .collection("core21")
      .doc(id);

    try {
      const doc = await docRef.get();
      if (doc?.exists) {
        return { props: doc.data() };
      } else {
        // doc.data() will be undefined in this case
        return { props: { error: "Not Found" } };
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
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
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));
  } catch (error) {
    console.log("Error getting document:", error);
  }
  return {
    paths,
    fallback: false,
  };
}
