import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "決済ページ",
  description: "Stripe Checkout による安全な決済",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
