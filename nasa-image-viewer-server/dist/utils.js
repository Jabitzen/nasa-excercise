"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictParseDate = exports.preprocessDate = exports.formatDateString = exports.readDatesFromFile = void 0;
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const readDatesFromFile = (filePath) => {
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    // trim removes whitespace from beginning and end of date, and boolean takes out "false" values since valid date strings are truthy
<<<<<<< HEAD
    return data
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
=======
    return data.split("\n").map((line) => line.trim()).filter(Boolean);
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
};
exports.readDatesFromFile = readDatesFromFile;
const formatDateString = (dateString) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/; // Match YYYY-MM-DD format
    const match = dateString.match(regex);
    if (!match) {
        console.error(`Invalid format: ${dateString}`);
        return "";
    }
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    // Validate ranges
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        console.error(`Invalid date: ${dateString}`);
        return "";
    }
    // Check for specific month/day validity
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day) {
        console.error(`Invalid date: ${dateString}`);
        return "";
    }
<<<<<<< HEAD
    return date.toISOString().split("T")[0]; // Return strict YYYY-MM-DD format
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
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
};
exports.formatDateString = formatDateString;
const preprocessDate = (dateString) => {
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
};
exports.preprocessDate = preprocessDate;
const strictParseDate = (dateString, format) => {
    const parsed = (0, exports.preprocessDate)(dateString);
    if (!parsed)
        return "";
    const { year, month, day } = parsed;
    // Parse the date using `date-fns` for validation
    const parsedDate = (0, date_fns_1.parse)(`${year}-${month}-${day}`, "yyyy-M-d", new Date());
    // Check if the parsed date matches the original components
    if (!(0, date_fns_1.isValid)(parsedDate) ||
        parsedDate.getFullYear() !== year ||
        parsedDate.getMonth() + 1 !== month ||
        parsedDate.getDate() !== day) {
        console.error(`Invalid date: ${dateString}`);
        return "";
    }
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};
exports.strictParseDate = strictParseDate;
