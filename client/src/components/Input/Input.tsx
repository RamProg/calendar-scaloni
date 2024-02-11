interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  name,
  label,
  hasError,
}) => {
  return (
    <>
      <label className="block" id={name}>
        {label}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full mt-1"
        />
        {hasError && (
          <span className="text-red-500">
            There is an issue with the {label}
          </span>
        )}
      </label>
    </>
  );
};

export default Input;
