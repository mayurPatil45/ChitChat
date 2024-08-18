
export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-green-500',
    textColor = 'text-black',
    className = '',
    ...props

}) {
  return (
    <button className={`px-3 py-2 rounded-md shadow-md font-semibold bg-green-500 text-black transition-all duration-300 hover:bg-green-700 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}