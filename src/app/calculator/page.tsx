'use client';

import {useState} from 'react';
import {Header} from '@/components/header';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import {ThemeToggle} from '@/components/theme-toggle';

export default function CalculatorPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = (isDark: boolean) => {
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className='min-h-screen bg-zinc-300 text-gray-800 flex flex-col items-center py-12 px-4 transition-colors duration-200'>
            <div className='absolute flex justify-center items-center top-4 right-4 gap-4'>
                <Link href='/'>
                    <HomeIcon fontSize={'large'} />
                </Link>

                <ThemeToggle onToggle={handleThemeToggle} />
            </div>
            <Header title='scrabble' subtitle='calculator' isDarkMode={false} />
        </div>
    );
}
