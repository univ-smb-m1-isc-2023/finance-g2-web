import { Label, TextInput, Textarea } from 'flowbite-react';
import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    textarea?: boolean;
}

export const Input = (props: IInputProps) => {
    if (props.textarea ?? false) {
        return (
            <div className='flex gap-1 w-full flex-col'>
                <div className=''>
                    <Label
                        htmlFor={props.name}
                        value={props.label}
                    />
                </div>
                <Textarea
                    rows={6}
                    {...(props as any)}
                />
            </div>
        );
    } else {
        return (
            <div className='flex gap-1 w-full flex-col'>
                <div className=''>
                    <Label
                        htmlFor={props.name}
                        value={props.label}
                    />
                </div>
                <TextInput {...props} />
            </div>
        );
    }
};
