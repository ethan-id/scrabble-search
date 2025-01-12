'use client';

import {NextUIProvider} from '@nextui-org/react';
import {FC, ReactNode} from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({children}) => <NextUIProvider>{children}</NextUIProvider>;
