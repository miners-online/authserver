import React from 'react';
import './globals.scss';
import { Providers } from './providers';

export const metadata = {
  title: 'Miners Online Account Manager',
  description: 'Manage your Miners Online account',
};

interface Props {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
