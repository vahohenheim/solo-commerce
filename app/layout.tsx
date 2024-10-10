import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import HeaderComponent from '@/app/_components/header/header';
import StoreProvider from '@/app/_store/provider';
import { Toaster } from '@/app/_components/toaster/toaster';

const geistSans = localFont({
    src: './_fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './_fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'solo commerce',
    description: 'ecommerce website'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
                <StoreProvider>
                    <>
                        <HeaderComponent />
                        <main className="mx-auto max-w-2xl px-4 py-6 sm:p-6 md:max-w-4xl lg:max-w-5xl lg:px-8">{children}</main>
                        <Toaster />
                    </>
                </StoreProvider>
            </body>
        </html>
    );
}
