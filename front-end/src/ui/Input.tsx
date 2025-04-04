"use client";
import { JSX, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

/**
 * InputProps interface defines the props for the Input component.
 * - `name`: The name and id of the input field.
 * - `type`: The type of the input field (e.g., text, email, password, number).
 * - `icon`: Optional icon to display inside the input field.
 * - `value`: The value of the input field.
 * - `onChange`: Callback function triggered when the input value changes.
 * - `...props`: Additional props inherited from React's InputHTMLAttributes.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: "text" | "email" | "password" | "number";
    disabled?: boolean;
    icon?: JSX.Element;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input component renders a styled input field with optional features:
 * - Icon support.
 * - Password visibility toggle for password fields.
 */
export default function Input({ name, type, disabled, icon, value, onChange, ...props }: InputProps) {
    // Reference to the input element for potential future use.
    const inputRef = useRef<HTMLInputElement>(null);

    // State to manage the current type of the input (e.g., password or text).
    const [inputType, setInputType] = useState(type);

    /**
     * Toggles the visibility of the password field.
     * Changes the input type between "password" and "text".
     */
    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    return (
        <div className="w-full select-none">
            {/* Label for the input field, formatted to replace underscores with spaces and lowercase the text */}
            <label htmlFor={name} className="text-sm capitalize text-gray-600">
                {name.replace(/_/g, " ").toLowerCase()}
            </label>
            <div className="w-full relative">
                {/* Optional icon displayed inside the input field */}
                {icon && (
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}
                {/* Input field with dynamic type and styling */}
                <input
                    id={name}
                    name={name}
                    disabled={disabled}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    ref={inputRef}
                    className={`w-full p-2.5 ${icon ? "pl-10" : "pl-2.5"} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} border border-gray-300 focus:border-gray-400 outline-none rounded-sm duration-200`}
                    {...props}
                />
                {/* Password visibility toggle button, only rendered for password fields */}
                {type === "password" && (
                    <button onClick={handleShowPassword} className="absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer text-gray-400">
                        {inputType === "password" ? (
                            <FaEye className="w-5 h-5" />
                        ) : (
                            <FaEyeSlash className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}