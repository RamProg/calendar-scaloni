export const createErrorMessage = (errors: string[]): string => {
  return `Invalid fields: ${errors.join(", ")}`;
};
