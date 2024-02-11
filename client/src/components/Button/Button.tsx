import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary';
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  styleType,
  styles,
  ...props
}) => {
  return (
    <button
      className={`p-2 rounded-lg font-sans font-medium transition-colors bg-gray-200 border border-transparent active:bg-gray-300 hover:border-gray-400 ${styleType === 'secondary' && 'bg-blue-200 hover:bg-blue-300 active:bg-blue-400  border-blue-500'} ${styles}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
