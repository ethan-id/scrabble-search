'use client';

import {NextUIProvider} from '@nextui-org/react';
import {FunctionComponent, ReactNode} from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: FunctionComponent<ProvidersProps> = ({children}) => <NextUIProvider>{children}</NextUIProvider>;
