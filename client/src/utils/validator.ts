export const isValidText = (text: string) => {
  const result = text.length > 0;
  return result;
};

export const isValidDate = (date: string) => {
  const start = new Date(1900, 0, 1);
  const end = new Date(2200, 11, 31);
  const dateToValidate = new Date(date);
  return (
    dateToValidate.toString() !== 'Invalid Date' &&
    dateToValidate >= start &&
    dateToValidate <= end
  );
};
