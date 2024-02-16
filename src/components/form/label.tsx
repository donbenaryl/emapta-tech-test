import "~styles/globals.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	className?: string;
	label?: string;
	children: React.ReactNode;
}

export default function Input(props: LabelProps) {
	const { className, label, children, ...rest } = props;
	return (
		<label
			{...rest}
			htmlFor="email"
			className={`block text-sm font-medium leading-6 text-gray-600 mb-1 ${className}`}
		>
			{children}
		</label>
	);
}
