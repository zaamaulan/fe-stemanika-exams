import React from 'react';
import { useResultContext } from '../context/scoreContext';

const Result = () => {
    const { score } = useResultContext();
    return (
        <div className='grid place-items-center h-screen'>
            <h1 className='text-xl font-semibold'>Your Score: {score}</h1>
        </div>
    );
};

export default Result;