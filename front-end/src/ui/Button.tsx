// Define the ButtonProps interface, which extends the default React button attributes.
// This allows the Button component to accept all standard button properties, 
// while also adding an optional `className` property for custom styling.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string; // Optional className for additional CSS classes.
}

// The Button component is a reusable UI component that renders a styled button.
// It accepts children (content inside the button), an optional className for custom styles,
// and any other standard button attributes via the spread operator.
export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <>
            <button className={`py-2.5 px-6 rounded-sm hover:cursor-pointer text-center gap-4 duration-200 ${className || ''}`} {...props}>
                {children}
            </button>
        </>
    );
}