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
      <label className="block mb-4 text-2xl font-bold sm:text-xl" id={name}>
        {label}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full p-2 mt-1 font-normal h-14 sm:h-10"
        />
        {hasError && (
          <span className="font-normal text-red-500" data-testid="error">
            There is an issue with the {label}
          </span>
        )}
      </label>
    </>
  );
};

export default Input;
