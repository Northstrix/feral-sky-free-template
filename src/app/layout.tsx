
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Feral Sky',
  description: 'A free natural habitat adventures website template distributed under the MIT License',
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/logo.webp',
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-body">
        <Suspense fallback={<div>Loading...</div>}>
            <AppProvider>
              {children}
            </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
