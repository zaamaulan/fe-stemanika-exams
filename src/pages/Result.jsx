import React from 'react';
import { useResultContext } from '../context/scoreContext';

const Result = () => {
    const { score } = useResultContext();
    return (
        <div className='grid h-[50vh] place-items-center'>
            <h1 className=''>Skor sementara: {score}</h1>
        </div>
    );
};

export default Result;