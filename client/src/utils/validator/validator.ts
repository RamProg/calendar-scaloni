export const isValidText = (text: string) => {
  return text.trim().length > 0;
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
