import {WordCard} from '@/components/word-card';

interface ResultsProps {
    results: string[];
}

export const Results: React.FC<ResultsProps> = ({results}) => {
    return (
        <div className={'bg-white shadow-md rounded-lg overflow-hidden w-full max-w-fit'}>
            <div className={'p-4 border-b border-gray-200 flex justify-between items-center'}>
                <h2 className={'text-lg font-semibold text-gray-700'}>Results ({results.length})</h2>
            </div>
            <div className='grid md:grid-cols-3 gap-4 p-4'>
                {results.map((word) => {
                    return <WordCard key={word} word={word} />;
                })}
            </div>
        </div>
    );
};
