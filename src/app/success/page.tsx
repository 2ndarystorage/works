import Link from "next/link";
import styles from "./page.module.css";

export default function SuccessPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>お支払いが完了しました！</h1>
        <p className={styles.message}>
          ご購入いただきありがとうございます。
          <br />
          確認メールをご登録のアドレスに送信しました。
        </p>
        <Link href="/" className={styles.button}>
          トップページへ戻る
        </Link>
      </div>
    </main>
  );
}
