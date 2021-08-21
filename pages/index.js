import GDSC from "../components/GDSC";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GDSC />
        <p className={styles.description}>Certificates🎉</p>

        <div className={styles.grid}>
          <Link href="/validate/">
            <a className={styles.card}>
              <h2>Validate Certificate &rarr;</h2>
              <p>Verify the authenticity of certificate by it&apos;s code </p>
            </a>
          </Link>
          <Link passHref href="/preview">
            <a className={styles.card}>
              <h2>Preview Certificate &rarr;</h2>
              <p>Add names on certificates and see how it looks</p>
            </a>
          </Link>
          <Link passHref href="/admin">
            <a className={styles.card}>
              <h2>Create Certificates &rarr;</h2>
              <p>For Google Develeloper Student Clubs Leads Only</p>
            </a>
          </Link>
          <a
            href="https://www.linkedin.com/in/dev-ahmedhany/"
            className={styles.card}
          >
            <h2>More About &rarr;</h2>
            <p>Contant The Developer and Check more Projects</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <h1 className={styles.title}>
          made with 💖 by{" "}
          <a href="https://github.com/dev-ahmedhany">Ahmed Hany</a>
        </h1>
      </footer>
    </div>
  );
}
