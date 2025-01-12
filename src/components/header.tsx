import {FunctionComponent} from 'react';

interface HeaderProps {
    isDarkMode: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({isDarkMode}) => {
    return (
        <div className='text-center mb-8'>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                Scrabble Search
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Find valid (English) Scrabble words
            </p>
        </div>
    );
};
