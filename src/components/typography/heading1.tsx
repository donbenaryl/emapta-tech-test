import "~styles/globals.scss";

interface LabelProps extends React.HTMLAttributes<HTMLHeadingElement> {
	className?: string;
	children: React.ReactNode;
}

export default function H1(props: LabelProps) {
	const { className, children, ...rest } = props;
	return (
		<h1
			{...rest}
			className={`font-bold
                text-[32px]
                text-primary
                mb-2
                ${className}`}
		>
			{children}
		</h1>
	);
}
