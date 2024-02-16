import '~styles/globals.scss';

interface ButtonProps extends 
React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
 }

export default function BtnPrimary(props: ButtonProps) {
    const { className, children, ...rest} = props

    return (
        <button
            {...rest}
            className={`bg-primary flex justify-center rounded-md px-5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-blue-600 ${className}`}
        >{children}</button>
    )
}