import React from 'react';

const Error = (props:{error?:string}) => {
    var error = props.error;
    return (
        <div className='flex justify-center items-center element p-10 h-[100vh] text-center w-full'>
            <p>
            {error?error:'Something went wrong'}
            </p>
        </div>
    );
};

export default Error;