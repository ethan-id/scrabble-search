import {ChangeEvent, FunctionComponent} from 'react';

interface SearchProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    query: string;
    isDarkMode: boolean;
}

export const Search: FunctionComponent<SearchProps> = ({onChange, query, isDarkMode}) => {
    return (
        <div className='flex shadow-sm mb-8 max-w-md w-full'>
            <input
                type='text'
                placeholder='Enter prefix...'
                value={query}
                onChange={onChange}
                className={`flex-grow p-2 rounded-lg min-w-[20vw] ${
                    isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-300'
                } focus:ring-blue-500 focus:border-blue-500`}
            />
        </div>
    );
};
