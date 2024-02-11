import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  styleType?: 'primary' | 'secondary' | 'tertiary';
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  styleType,
  styles,
  ...props
}) => {
  const getStyleString = (styleType: string) => {
    switch (styleType) {
      case 'primary':
      default:
        return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 border-gray-500';
      case 'secondary':
        return 'bg-blue-200 hover:bg-blue-300 active:bg-blue-400 border-blue-500';
      case 'tertiary':
        return 'bg-red-200 hover:bg-red-300 active:bg-red-400 border-red-500';
    }
  };

  const styleString = getStyleString(styleType || 'primary');

  return (
    <button
      className={`p-2 rounded-lg font-sans font-medium transition-colors border ${styleString}} ${styles}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
