export default function Accordion(props:any) {
    return (
        <div className="hover:bg-gray-800 rounded-md w-full ">
            <button className="flex items-center transition duration-300 hover:text-orange-300 cursor-pointer" onClick={props.toggleAccordion}>
                {props.title}
                <span className={`float-right transform ${props.isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 `}>
                    &#9660;
                </span>
            </button>
            {props.isOpen && props.data.map((val:any)=><div className="pt-4 pl-4 hover:text-orange-300 ">{val}</div>)}
        </div>
    );
};