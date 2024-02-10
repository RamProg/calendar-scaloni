import { IEvent } from "../models/event.model";

export const findErrors = (event: IEvent): string[] => {
  const { title, description, startDate, endDate } = event;

  const errors: string[] = [];

  if (!isValidString(title)) {
    errors.push("title");
  }

  if (!isValidString(description)) {
    errors.push("description");
  }

  if (!isValidISODateString(startDate)) {
    errors.push("startDate");
  }
  if (!isValidISODateString(endDate)) {
    errors.push("endDate");
  }

  return errors;
};

const isValidISODateString = (value: unknown) => {
  if (!isValidString(value)) return false;

  const stringValue = value as string;

  const isoDatePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(([+-]\d{2}:\d{2})|Z)?$/;

  if (!isoDatePattern.test(stringValue)) return false;

  const date = new Date(stringValue);
  return !isNaN(date.getTime());
};

const isValidString = (value: unknown) => {
  return value && typeof value === "string" && value.trim() !== "";
};

export const isValidMonth = (value: unknown) => {
  if (!isValidString(value)) return false;

  const stringValue = value as string;

  const month = Number(stringValue);

  return month >= 1 && month <= 12;
}

export const isValidYear = (value: unknown) => {
  if (!isValidString(value)) return false;

  const stringValue = value as string;

  const year = Number(stringValue);

  return year >= 1900 && year <= 2200;
}