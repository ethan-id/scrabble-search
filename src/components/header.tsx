import {FC} from 'react';

interface HeaderProps {
    isDarkMode: boolean;
}

export const Header: FC<HeaderProps> = ({isDarkMode}) => {
    const scrabble = ['S', 'C', 'R', 'A', 'B', 'B', 'L', 'E'];
    const search = ['S', 'E', 'A', 'R', 'C', 'H'];

    return (
        <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-4 mb-4'>
                <div className='flex flex-row gap-1'>
                    {scrabble.map((l, i) => (
                        <Letter letter={l} key={`scrabble-${i}`} />
                    ))}
                </div>
                <div className='flex flex-row gap-1'>
                    {search.map((l, i) => (
                        <Letter letter={l} key={`search-${i}`} />
                    ))}
                </div>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Find valid (English) Scrabble words
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Not Affiliated with <a href={'https://playscrabble.com/'}>Hasbro&apos;s Scrabble</a>
            </p>
        </div>
    );
};

interface LetterProps {
    letter: string;
}

const Letter: FC<LetterProps> = ({letter}) => (
    <div className='flex items-center justify-center text-xl md:text-3xl w-10 md:w-12 h-10 md:h-12 p-4 rounded-lg bg-[#FFDC9F] font-semibold text-black shadow-md'>
        {letter}
    </div>
);
