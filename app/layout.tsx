import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RENOBEST 営業支援Hub",
  description: "RENOBEST営業担当者向け営業支援AIプロンプト生成ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
