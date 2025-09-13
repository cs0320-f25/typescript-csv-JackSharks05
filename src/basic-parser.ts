import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(path: string, CSVRowSchema: z.ZodType<T>): Promise<string[][] | T[] | z.ZodError> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  // Create an empty array to hold the results
  let result: string[][] | T[] = []

  // We add the "await" here because file I/O is asynchronous.
  // We need to force TypeScript to _wait_ for a row before moving on.
  // More on this in class soon!
  if (CSVRowSchema) {
    // console.log("yes we have a schema", CSVRowSchema);
    let result: T[] = []
    for await (const line of rl) {
      type CSVRow = z.infer<typeof CSVRowSchema>
      const values = parseCSVLine(line);
      // console.log("the values are:", values);
      const parsedResult: z.ZodSafeParseResult<CSVRow> = CSVRowSchema.safeParse(values)
      // console.log("the parsed result:", parsedResult);
      if (parsedResult.success) {
        // console.log("we are pushing:", parsedResult.data);
        result.push(parsedResult.data)
        // console.log("the result so far:", result);
      } else {
        // console.log("error parsing line:", line);
        return parsedResult.error
      }
    }
    return result
  } else {
    // console.log("no schema provided");
    let result: string[][] = []
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      result.push(values)
    }
    return result
  }

}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}