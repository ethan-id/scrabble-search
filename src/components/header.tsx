import {FC} from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;
}

export const Header: FC<HeaderProps> = ({title, subtitle}) => {
    const heading = title.toUpperCase().split('');
    const subheading = subtitle.toUpperCase().split('');

    return (
        <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-4 mb-4'>
                <div className='flex flex-row gap-1'>
                    {heading.map((l, i) => (
                        <Letter letter={l} key={`title-${i}`} />
                    ))}
                </div>
                <div className='flex flex-row gap-1'>
                    {subheading.map((l, i) => (
                        <Letter letter={l} key={`subtitle-${i}`} />
                    ))}
                </div>
            </div>
            <p className={'text-sm text-gray-600'}>Find valid (English) Scrabble words</p>
            <p className={'text-xs text-gray-600'}>
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
