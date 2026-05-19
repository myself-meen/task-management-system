import { useClickOutside } from '../../CustomHooks/useClickOutside';
function ThreeDotMenuEmp({onEdit, onRemove,onClose }) {
    const domref=useClickOutside(()=>{
        onClose();
    
    });

    return ( <>
    <div ref={domref} className='absolute right-0 mt-2 w-32 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'>
        <div className="flex flex-col">
            <button onClick={onEdit} className="text-left px-4 py-2 hover:bg-gray-100">Edit</button>
            
            <button onClick={onRemove} className="text-left px-4 py-2 hover:bg-gray-100 text-red-600">Remove</button>

        </div>
    </div>
    </> );
}

export default ThreeDotMenuEmp;