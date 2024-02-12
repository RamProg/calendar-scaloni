import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary' | 'tertiary';
  big?: boolean;
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  styleType,
  styles,
  big,
  ...props
}) => {
  const styleClasses = {
    primary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 border-gray-500',
    secondary: 'bg-blue-200 hover:bg-blue-300 active:bg-blue-400 border-blue-500',
    tertiary: 'bg-red-200 hover:bg-red-300 active:bg-red-400 border-red-500',
  };

  const styleClass = styleClasses[styleType || 'primary'];

  return (
    <button
      className={`p-2 rounded-lg font-sans font-medium transition-colors border ${big && 'text-xl p-3'} ${styleClass} ${styles}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
