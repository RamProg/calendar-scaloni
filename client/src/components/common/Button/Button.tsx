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
  const getStyleColor = (styleType: string | undefined) => {
    switch (styleType) {
      case 'tertiary':
        return 'red';
      case 'secondary':
        return 'blue';
      case 'primary':
      default:
        return 'gray';
    }
  };

  const styleColor = getStyleColor(styleType);

  return (
    <button
      className={`p-2 rounded-lg font-sans font-medium transition-colors border ${big && 'text-xl p-3'} ${styles} bg-${styleColor}-200 hover:bg-${styleColor}-300 active:bg-${styleColor}-400 border-${styleColor}-500`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
