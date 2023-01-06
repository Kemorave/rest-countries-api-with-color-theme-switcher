import React from 'react';
import { AiOutlineLoading } from 'react-icons/all';

const Loading = () => {
    return (
        <div className='flex justify-center items-center element p-10 h-[100vh] text-center w-full'>
            <AiOutlineLoading className='animate-spin h-16 w-16' />
        </div>
    );
};

export default Loading;