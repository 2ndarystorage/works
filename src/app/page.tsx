import styles from "./page.module.css";
import CheckoutButton from "@/components/CheckoutButton";

const PRODUCTS = [
  {
    id: "prod_basic",
    name: "ベーシックプラン",
    description: "個人・小規模チームに最適なプランです。",
    price: 1000,
    currency: "jpy",
    features: ["最大3プロジェクト", "基本サポート", "1GBストレージ"],
  },
  {
    id: "prod_pro",
    name: "プロプラン",
    description: "成長するチームに必要な機能をすべて揃えました。",
    price: 3000,
    currency: "jpy",
    features: [
      "無制限プロジェクト",
      "優先サポート",
      "50GBストレージ",
      "高度な分析",
    ],
  },
  {
    id: "prod_enterprise",
    name: "エンタープライズ",
    description: "大規模組織向けのカスタムソリューション。",
    price: 10000,
    currency: "jpy",
    features: [
      "無制限すべて",
      "24/7専任サポート",
      "500GBストレージ",
      "SLA保証",
      "カスタム連携",
    ],
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>料金プラン</h1>
        <p className={styles.subtitle}>
          あなたのニーズに合ったプランをお選びください
        </p>
      </header>

      <div className={styles.grid}>
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className={`${styles.card} ${index === 1 ? styles.featured : ""}`}
          >
            {index === 1 && (
              <div className={styles.badge}>人気No.1</div>
            )}
            <div className={styles.cardHeader}>
              <h2 className={styles.planName}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
            </div>

            <div className={styles.priceWrapper}>
              <span className={styles.currency}>¥</span>
              <span className={styles.price}>
                {product.price.toLocaleString("ja-JP")}
              </span>
              <span className={styles.period}>/月</span>
            </div>

            <ul className={styles.features}>
              {product.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <CheckoutButton
              productId={product.id}
              productName={product.name}
              price={product.price}
              currency={product.currency}
              featured={index === 1}
            />
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>決済はStripeによる安全な暗号化通信で保護されています</p>
        <div className={styles.stripeNote}>
          <svg viewBox="0 0 60 25" className={styles.stripeLogo} xmlns="http://www.w3.org/2000/svg">
            <path
              d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.05-2.58-2.06-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.45.94V6.27h3.96l.1 1.02a4.7 4.7 0 0 1 3.36-1.32c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 6.93-5.67 6.93zm-1.03-9.98c-.86 0-1.37.3-1.88.76l.02 5.93c.5.43 1 .72 1.86.72 1.48 0 2.47-1.67 2.47-3.71 0-2.04-.97-3.7-2.47-3.7zM28.24 5.7c-1.43 0-2.3-1-2.3-2.32C25.94 2 26.8 1 28.24 1c1.43 0 2.3 1 2.3 2.38 0 1.32-.87 2.32-2.3 2.32zm2.23 14.44h-4.46V6.27h4.46v13.87zM19.7 20.3c-2.33 0-4.01-1.02-5.07-2.13l2.26-2.87c.86.97 1.9 1.72 3.22 1.72.86 0 1.37-.43 1.37-.97v-.03c0-.72-.54-1.06-2.21-1.57-2.5-.73-4.22-1.85-4.22-4.36v-.04c0-2.64 2.1-4.47 5.1-4.47 2.1 0 3.78.66 5.08 1.9l-2.04 3.05c-.86-.76-1.8-1.27-2.9-1.27-.73 0-1.1.37-1.1.9v.04c0 .72.54 1.05 2.27 1.57 2.63.8 4.17 1.93 4.17 4.35v.04c0 2.9-2.08 4.5-5.03 4.5h-.2zm-7.4-14.3l-4.37.93V4.7L12.3 3.8v2.2zm0 14.03H7.85V6.27h4.46v13.76H12.3zM5.18 20.3c-1.43 0-2.3-.6-2.87-1.04L2.3 23.9 0 24.83V6.27h3.96l.1 1.02A4.7 4.7 0 0 1 7.42 5.97c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 6.93-5.86 6.93zm-1-9.98c-.87 0-1.38.3-1.89.76l.02 5.93c.5.43 1.01.72 1.87.72 1.47 0 2.46-1.67 2.46-3.71 0-2.04-.97-3.7-2.46-3.7z"
              fill="#6772e5"
            />
          </svg>
          <span>Stripe で安全に決済</span>
        </div>
      </footer>
    </main>
  );
}
