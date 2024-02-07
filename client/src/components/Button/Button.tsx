import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, styles, ...props }) => {
  return (
    <button className={`p-2 rounded-lg ${styles}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
