import { FC, InputHTMLAttributes } from "react";

const TextInput: FC<
    InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = props => {
    const { label, ...userProps } = props;

    return (
        <input
            type="text"
            className="flex items-center ring-0 outline-none bg-bg duration-150 p-1 px-2 w-full rounded-lg"
            placeholder={label}
            {...userProps}
        />
    );
};

export default TextInput;
