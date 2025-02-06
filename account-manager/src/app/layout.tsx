import React from 'react';
import './globals.scss';
import { Providers } from './providers';
import { UserProvider } from '@/utils/auth/context/UserProvider';

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
                <UserProvider>
                    <Providers>{children}</Providers>
                </UserProvider>
            </body>
        </html>
    );
}
