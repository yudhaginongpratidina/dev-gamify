"use client"
import { useRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
}

export default function Select({ name, options, disabled, onChange, ...props }: SelectProps) {
    const selectRef = useRef<HTMLSelectElement>(null);

    return (
        <div className="w-full select-none">
            {/* Label for the select field, formatted to replace underscores with spaces and lowercase the text */}
            <label htmlFor={name} className="text-sm capitalize text-gray-600">
                {name.replace(/_/g, " ").toLowerCase()}
            </label>
            <div className="w-full relative">
                {/* Select field with dynamic styling */}
                <select
                    id={name}
                    name={name}
                    ref={selectRef}
                    disabled={disabled}
                    onChange={onChange}
                    {...props}
                    className={`w-full h-[40px] px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}