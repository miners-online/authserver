'use client';

import React from 'react';
import MainHeader from '@/components/MainHeader';
import { Content, Theme } from '@carbon/react';


interface Props {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return (
        <div>
            <Theme theme="g100">
                <MainHeader />
            </Theme>
            <Content>{children}</Content>
        </div>
    );
}
