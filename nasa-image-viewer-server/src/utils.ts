import { parse, format, isValid } from "date-fns";
import fs from "fs";

<<<<<<< HEAD
export const readDatesFromFile = (filePath: string): string[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  // trim removes whitespace from beginning and end of date, and boolean takes out "false" values since valid date strings are truthy
  return data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

export const formatDateString = (dateString: string): string => {
=======

export const readDatesFromFile = (filePath: string): string[] => {
    const data = fs.readFileSync(filePath, "utf-8");
    // trim removes whitespace from beginning and end of date, and boolean takes out "false" values since valid date strings are truthy
    return data.split("\n").map((line) => line.trim()).filter(Boolean);
  };

export const formatDateString = (dateString: string): string => {

>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/; // Match YYYY-MM-DD format
  const match = dateString.match(regex);

  if (!match) {
    console.error(`Invalid format: ${dateString}`);
    return "";
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

<<<<<<< HEAD
=======
  // Validate ranges
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    console.error(`Invalid date: ${dateString}`);
    return "";
  }

  // Check for specific month/day validity
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    console.error(`Invalid date: ${dateString}`);
    return "";
  }

<<<<<<< HEAD
  return date.toISOString().split("T")[0];
};

export const preprocessDate = (
  dateString: string
): { year: number; month: number; day: number } | null => {
  // Try matching different formats
  const mmddyyMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{2})/); // MM/dd/yy
  const mmmddyyyyMatch = dateString.match(/(\w+)-(\d{2})-(\d{4})/); // MMM-dd-yyyy
  const verboseMatch = dateString.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/); // Month day, year

  if (mmddyyMatch) {
    const [, mm, dd, yy] = mmddyyMatch;
    const year = 2000 + parseInt(yy, 10);
    const month = parseInt(mm, 10);
    const day = parseInt(dd, 10);
    return { year, month, day };
  }

  if (mmmddyyyyMatch) {
    const [, monthName, dayStr, yearStr] = mmmddyyyyMatch;
    const month = new Date(`${monthName} 1, 2000`).getMonth() + 1; // Convert month name to a number
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    return { year, month, day };
  }

  if (verboseMatch) {
    const [, monthName, dayStr, yearStr] = verboseMatch;
    const month = new Date(`${monthName} 1, 2000`).getMonth() + 1; // Convert month name to a number
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    return { year, month, day };
  }

  console.error(`Invalid format: ${dateString}`);
  return null;
};

export const strictParseDate = (dateString: string, format: string): string => {
  const parsed = preprocessDate(dateString);
  if (!parsed) return "";

  const { year, month, day } = parsed;

  // Parse the date using `date-fns` for validation
  const parsedDate = parse(`${year}-${month}-${day}`, "yyyy-M-d", new Date());

  // Check if the parsed date matches the original components
  if (
    !isValid(parsedDate) ||
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() + 1 !== month ||
    parsedDate.getDate() !== day
  ) {
    console.error(`Invalid date: ${dateString}`);
    return "";
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};
=======
  return date.toISOString().split('T')[0]; // Return strict YYYY-MM-DD format

    // try {
    //     const parsedDate = parse(dateString, "MM/dd/yy", new Date()) ||
    //                        parse(dateString, "MMMM d, yyyy", new Date()) ||
    //                        parse(dateString, "MMM-dd-yyyy", new Date());
    //     console.log(parsedDate);
    //     return format(parsedDate, "yyyy-MM-dd");
    // } catch (error) {
    //     console.log(`Invalid date format: ${dateString}`);
    //     return "";
    // }


    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const day = date.getDate().toString().padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;
    // // const checkDate = new Date(formattedDate)

    // return formattedDate;
  };

  export const preprocessDate = (dateString: string): { year: number; month: number; day: number } | null => {
      // Try matching different formats
    const mmddyyMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{2})/); // MM/dd/yy
    const mmmddyyyyMatch = dateString.match(/(\w+)-(\d{2})-(\d{4})/); // MMM-dd-yyyy
    const verboseMatch = dateString.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/); // Month day, year

    if (mmddyyMatch) {
      const [, mm, dd, yy] = mmddyyMatch;
      const year = 2000 + parseInt(yy, 10); // Assuming dates are in the 2000s
      const month = parseInt(mm, 10);
      const day = parseInt(dd, 10);
      return { year, month, day };
    }

    if (mmmddyyyyMatch) {
      const [, monthName, dayStr, yearStr] = mmmddyyyyMatch;
      const month = new Date(`${monthName} 1, 2000`).getMonth() + 1; // Convert month name to a number
      const day = parseInt(dayStr, 10);
      const year = parseInt(yearStr, 10);
      return { year, month, day };
    }

    if (verboseMatch) {
      const [, monthName, dayStr, yearStr] = verboseMatch;
      const month = new Date(`${monthName} 1, 2000`).getMonth() + 1; // Convert month name to a number
      const day = parseInt(dayStr, 10);
      const year = parseInt(yearStr, 10);
      return { year, month, day };
    }

    console.error(`Invalid format: ${dateString}`);
    return null;
  }

  export const strictParseDate = (dateString: string, format: string): string => {
    const parsed = preprocessDate(dateString);
    if (!parsed) return "";

    const { year, month, day } = parsed;

    // Parse the date using `date-fns` for validation
    const parsedDate = parse(`${year}-${month}-${day}`, "yyyy-M-d", new Date());

    // Check if the parsed date matches the original components
    if (
      !isValid(parsedDate) ||
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() + 1 !== month ||
      parsedDate.getDate() !== day
    ) {
      console.error(`Invalid date: ${dateString}`);
      return "";
    }

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
