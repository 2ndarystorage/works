"use client";

import { useState } from "react";
import styles from "./CheckoutButton.module.css";

interface CheckoutButtonProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  featured?: boolean;
}

export default function CheckoutButton({
  productId,
  productName,
  price,
  currency,
  featured = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, productName, price, currency }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "エラーが発生しました");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`${styles.button} ${featured ? styles.featured : styles.default}`}
      >
        {loading ? (
          <>
            <span className={styles.spinner} />
            処理中...
          </>
        ) : (
          "今すぐ始める"
        )}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
