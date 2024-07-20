import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './reset.css';
import './globals.css';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FEConf 2024',
  description: '국내 최대 프론트엔드 개발 컨퍼런스, FECONF 2024가 8월 24일 오프라인으로 찾아옵니다.',
  openGraph: {
    type: 'website',
    url: 'https://2024.feconf.kr',
    images: [
      {
        url: 'https://2024.feconf.kr/fe2024_og.png',
        width: 1200,
        height: 630,
        alt: 'FEConf 2024'
      }
    ],
  },
  twitter: {
    title: 'FEConf 2024',
    description: '국내 최대 프론트엔드 개발 컨퍼런스, FECONF 2024가 8월 24일 오프라인으로 찾아옵니다.',
    card: 'summary_large_image',
    creator: '@FeConf',
    images: [{ url: 'https://2024.feconf.kr/fe2024_og.png' }]
  }
};

function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
    <head>
      <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-RVV7YMBQEY"/>
      <script dangerouslySetInnerHTML={{  __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RVV7YMBQEY');
`}}/>
    </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
