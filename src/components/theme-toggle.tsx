import {useState, useEffect} from 'react';
import {Moon, Sun} from 'lucide-react';

interface ThemeToggleProps {
    onToggle: (isDark: boolean) => void;
}

export function ThemeToggle({onToggle}: ThemeToggleProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('theme') === 'dark';
        setIsDark(isDarkMode);
        onToggle(isDarkMode);
    }, [onToggle]);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        onToggle(newIsDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
