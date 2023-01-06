import React from 'react';
import { AiOutlineLoading } from 'react-icons/all';
import Shimmer from './shimmer';

const Loading = (props:{shimmer?:Boolean,shimmerClassName?:string,num?:number}) => {
    
    if (props.shimmer) {
        var shimmers=[];
        for (let index = 0; index < (props.num??1); index++) {
            shimmers.push(<Shimmer key={index} className={props.shimmerClassName}/>);
        }
       return (<div className='flex flex-wrap justify-center items-center element p-5 h-[100vh] text-center w-full'>
           {
            shimmers 
           }
        </div>) 
    }
    return (
        <div className='flex justify-center items-center element p-10 h-[100vh] text-center w-full'>
            <AiOutlineLoading className='animate-spin h-16 w-16' />
        </div>
    );
};

export default Loading;