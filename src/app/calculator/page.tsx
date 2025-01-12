import {Header} from '@/components/header';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function CalculatorPage() {
    return (
        <div className='min-h-screen bg-zinc-300 text-gray-800 flex flex-col items-center py-12 px-4 transition-colors duration-200'>
            <div className='absolute flex justify-center items-center top-4 right-4 gap-4'>
                <Link href='/'>
                    <HomeIcon fontSize={'large'} />
                </Link>
            </div>
            <Header title='scrabble' subtitle='calculator' />
            This page is currently under construction!
        </div>
    );
}
