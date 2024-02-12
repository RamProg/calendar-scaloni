export const createErrorMessage = (errors: string[]): string => {
  return `Invalid or missing fields: ${errors.join(', ')}`;
};
