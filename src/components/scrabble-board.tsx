'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {ScrabbleTile} from '@/components/scrabble-tile';

interface ScrabbleBoardProps {
    initialWord: string;
    points: number[];
}

export type TileState = 'N' | 'DL' | 'TL' | 'DW' | 'TW';

export function ScrabbleBoard({initialWord, points}: ScrabbleBoardProps) {
    const [word, setWord] = useState(initialWord);
    const [tileStates, setTileStates] = useState<TileState[]>(Array(initialWord.length).fill('N'));

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
            setWord((prevWord) => prevWord + event.key.toUpperCase());
            setTileStates((prevStates) => [...prevStates, 'N']);
        } else if (event.key === 'Backspace') {
            setWord((prevWord) => prevWord.slice(0, -1));
            setTileStates((prevStates) => prevStates.slice(0, -1));
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleTileClick = (index: number) => {
        const newStates = [...tileStates];
        const states: TileState[] = ['N', 'DL', 'TL', 'DW', 'TW'];
        const currentStateIndex = states.indexOf(newStates[index]);
        newStates[index] = states[(currentStateIndex + 1) % states.length];
        setTileStates(newStates);
    };

    const calculateScore = () => {
        let score = 0;
        let wordMultiplier = 1;

        word.split('').forEach((letter, index) => {
            const letterScore = points[letter.toLowerCase().charCodeAt(0) - 97] || 0;
            let tileScore = letterScore;

            switch (tileStates[index]) {
                case 'DL':
                    tileScore *= 2;
                    break;
                case 'TL':
                    tileScore *= 3;
                    break;
                case 'DW':
                    wordMultiplier *= 2;
                    break;
                case 'TW':
                    wordMultiplier *= 3;
                    break;
            }

            score += tileScore;
        });

        return score * wordMultiplier;
    };

    return (
        <div className='flex flex-col items-center space-y-4'>
            <div className='flex flex-wrap justify-center gap-2 max-w-3xl'>
                {word.split('').map((letter, index) => (
                    <div key={`scrabble-tile-${letter}-${index}`} className='relative'>
                        <ScrabbleTile
                            letter={letter}
                            state={tileStates[index]}
                            onClick={() => handleTileClick(index)}
                        />
                    </div>
                ))}
                {word.length === 0 && (
                    <div className='relative'>
                        <ScrabbleTile letter='' state='N' onClick={() => {}} />
                    </div>
                )}
            </div>
            <div className='text-2xl font-bold'>Score: {calculateScore()}</div>
            <p className='text-sm text-gray-600 text-center max-w-md'>
                Click on a tile to change its bonus. Type to add letters. Press Backspace to remove the last letter. The
                word will expand as you type.
            </p>
        </div>
    );
}
