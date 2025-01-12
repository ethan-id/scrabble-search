import {ChangeEvent, FC} from 'react';
import {Input} from '@nextui-org/react';

interface SearchProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    query: string;
}

export const Search: FC<SearchProps> = ({onChange, query}) => {
    return (
        <div className='flex shadow-sm mb-8 max-w-md w-full'>
            <Input
                isClearable
                placeholder='Enter a prefix...'
                size='lg'
                value={query}
                onChange={onChange}
                startContent={<SearchIcon size={18} />}
                type='search'
            />
        </div>
    );
};

interface SearchIconProps {
    size?: number;
    strokeWidth?: number;
    width?: number;
    height?: number;
    [key: string]: any;
}

const SearchIcon: FC<SearchIconProps> = ({size = 24, strokeWidth = 1.5, width, height, ...props}) => {
    return (
        <svg
            aria-hidden='true'
            fill='none'
            focusable='false'
            height={height || size}
            role='presentation'
            viewBox='0 0 24 24'
            width={width || size}
            {...props}
        >
            <path
                d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={strokeWidth}
            />
            <path
                d='M22 22L20 20'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};
