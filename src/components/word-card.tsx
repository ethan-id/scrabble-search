import {FC} from 'react';
import {points} from '@/literals/points';

interface WordCardProps {
    word: string;
}

export const WordCard: FC<WordCardProps> = ({word}) => {
    const value = word.split('').reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);

    return (
        <div
            className={
                'bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors flex flex-col items-center justify-between'
            }
        >
            <div
                className={
                    'flex flex-row justify-center gap-1 p-2 text-gray-800 font-medium text-lg truncate w-full text-center'
                }
                title={word}
            >
                {word.split('').map((letter, i) => (
                    <div
                        key={`${word}-${letter}-${i}`}
                        className='flex items-center justify-center text-lg md:text-2xl w-8 md:w-10 h-8 md:h-10 p-4 rounded-lg bg-[#FFDC9F] font-semibold text-black shadow-md'
                    >
                        {letter}
                    </div>
                ))}
            </div>
            <p className={'text-gray-600 text-sm mt-1'}>
                {value} {value === 1 ? 'point' : 'points'}
            </p>
        </div>
    );
};
