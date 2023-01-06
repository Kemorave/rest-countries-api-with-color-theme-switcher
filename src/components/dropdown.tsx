import React, { useState, Ref } from "react";
const Dropdown = (props: {
  onSelect: (e: string) => void;
  className?: string | undefined;
  header:(isOpen:boolean)=> JSX.Element;
  options: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onBlur={() => {
        setIsOpen(false);
      }}
      tabIndex={0}
      className={`flex   flex-col ${props.className}`}
      onClick={(e) => {
        e.currentTarget.focus();
        setIsOpen(!isOpen);
      }}
    >
      {props.header(isOpen)}

      <div className="relative">
        <div
          className={`${isOpen ? "translate-y-0" : "-translate-y-24 scale-0"}  absolute 
        w-full 
        -top-full   
        transition-all items-stretch
       flex gap-2 flex-col rounded-md overflow-clip p-5 
       element mt-1`}
        >
          {props.options.length > 0
            ? props.options.map((a,i) => (
                <p key={`${i+1}-${a}`}
                  onClick={(e) => {
                    if (e.target != e.currentTarget) return;
                    props.onSelect(a);
                    setIsOpen(false);
                  }}
                  className="text-sm cursor-pointer"
                >
                  {a}
                </p>
              ))
            : []}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
function LegacyRef() {
  throw new Error("Function not implemented.");
}
