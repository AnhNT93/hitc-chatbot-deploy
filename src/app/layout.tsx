import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HITC · Trợ lý ảo",
  description:
    "Trợ lý ảo HITC — tư vấn dịch vụ Data Center, Cloud, Internet, Truyền dẫn và Chuyển đổi số.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-paper-50 text-ink-900 antialiased">
        <div className="ambient-bg" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
