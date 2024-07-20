import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './reset.css';
import './globals.css';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FEConf 2024',
  description: 'Hello, FEConf 2024',
};

function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
