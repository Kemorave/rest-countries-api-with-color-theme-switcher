import React from 'react';

const Shimmer = (props:{className?:string,Sheight?:string}) => {
    const {
        className,
        Sheight
      } = props;
      let class_name="loading-shimmer loading-shimmer-animation " +(className ? className:"");
      return (
          <span className={class_name}
               ></span>);
};

export default Shimmer;