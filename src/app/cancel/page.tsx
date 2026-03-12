import Link from "next/link";
import styles from "./page.module.css";

export default function CancelPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.icon}>×</div>
        <h1 className={styles.title}>お支払いがキャンセルされました</h1>
        <p className={styles.message}>
          決済がキャンセルされました。
          <br />
          再度ご検討の際はいつでもお越しください。
        </p>
        <Link href="/" className={styles.button}>
          プランを選び直す
        </Link>
      </div>
    </main>
  );
}
