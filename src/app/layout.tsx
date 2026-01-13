import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Colombus Coffee',
  description: 'Luxury Syrian coffee experiences'
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
