import '~styles/globals.scss';
import styles from '~styles/checkbox.module.scss';
import { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps extends
React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    children: React.ReactNode;
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
    name: FieldPath<FieldValues>;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RadioCheckbox(props: InputProps) {
    const { className, children, register, onChange, rules, name, ...rest} = props;

    return (
        <>
            <label className={`${styles.control} ${styles.controlCheckbox} ${className}`}>
                <input
                    {...rest}
                    {...(register && register(name, rules))}
                    type="radio"
                    name={name}
                    onChange={onChange}
                />
                    <span className='font-normal text-sm text-gray-600'>{children}</span>
                <div className={`${styles.controlIndicator}`}></div>
            </label>
        </>
    )
}