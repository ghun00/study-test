import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미대 재수생 학습 진단 | Outcome Quiz",
  description: "2분 내로 미대 재수생의 공부·실기 병행 습관을 진단하고 맞춤형 솔루션을 제공합니다.",
  keywords: "미대, 재수, 학습진단, 공부습관, 실기, 포트폴리오",
  openGraph: {
    title: "미대 재수생 학습 진단",
    description: "2분 내로 미대 재수생의 공부·실기 병행 습관을 진단하고 맞춤형 솔루션을 제공합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
