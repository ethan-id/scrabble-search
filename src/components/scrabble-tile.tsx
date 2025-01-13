import React from 'react';
import {TileState} from './scrabble-board';

interface ScrabbleTileProps {
    letter: string;
    state: TileState;
    onClick: () => void;
}

const stateColors: Record<TileState, string> = {
    N: 'bg-[#FFD99E]',
    DL: 'bg-[#68A1C3]',
    TL: 'bg-[#0D669C]',
    DW: 'bg-[#E4A2A2]',
    TW: 'bg-[#BE4E4E]'
};

export function ScrabbleTile({letter, state, onClick}: ScrabbleTileProps) {
    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 ${stateColors[state]} flex items-center justify-center text-lg md:text-xl w-10 md:w-12 h-10 md:h-12 p-4 rounded-lg bg-[#FFDC9F] font-semibold text-black shadow-md`}
        >
            {letter.toUpperCase()}
        </button>
    );
}
