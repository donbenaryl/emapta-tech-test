import "~styles/globals.scss";
import Label from "@/components/form/label";
import {
	FieldValues,
	FieldPath,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";
import { useEffect, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: FieldPath<FieldValues>;
	register?: UseFormRegister<any>;
	rules?: RegisterOptions;
	className?: string;
	label?: string;
	error?: string;
    isSubmitted?: boolean;
}

export default function Input(props: InputProps) {
	const { name, register, rules, className, label, error, isSubmitted, ...rest } = props;

    const dangerClass = `
        border-red-500
        text-red-900
        focus:ring-red-500
        focus:border-red-500
        bg-red-50
        placeholder-red-700`;

    const successClass = `
        border-green-500
        text-green-900
        focus:ring-green-500
        focus:border-green-500
        bg-green-50
        placeholder-green-700`;

	return (
		<div className="w-full mb-5">
			{label && <Label>{label}</Label>}
			<input
				{...rest}
				{...(register && register(name, rules))}
				className={`
                    border
                    text-sm
                    rounded-lg
                    block
                    w-full
                    p-2.5
                    py-3
                    placeholder-gray-400
                    font-light
                    ${className}
                    ${isSubmitted ? (error ? dangerClass : successClass): ''}`}
			/>
			{error && <span className="w-full text-red-900 text-sm">{error}</span>}
		</div>
	);
}
