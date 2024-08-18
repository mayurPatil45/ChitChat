import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    placeholder = '',
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='font-semibold mb-3 ml-1' htmlFor={id}>{label}</label>}
            <input type={type} className={`px-5 py-2 mt-2 my-3 outline-none text-gray-700 rounded-md bg-gray-200 p-2 w-full ${className}`} ref={ref} placeholder={placeholder} {...props} id={id}/>
        </div>
    )
})

export default Input;
