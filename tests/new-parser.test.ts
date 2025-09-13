import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const CSVRowSchema1 = z.tuple([z.string(), z.string()]).transform(([name, age]) => ({ name, age: Number(age) }));
const CSVRowSchema2 = z.tuple([z.string(), z.string(), z.string()]).transform(([person, year, quotes]) => ({ person, "year of birth": Number(year), quotes }));

test("parseCSV yields arrays", async () => {
    const results: string[][] | z.ZodError<unknown> | { name: string, age: number }[] = await parseCSV(PEOPLE_CSV_PATH, CSVRowSchema1)
    if (results instanceof z.ZodError) {
        expect(true).toBe(false);
    } else {
        expect(results).toHaveLength(5);
        expect(results[0]).toEqual({ name: "name", age: NaN });
        expect(results[1]).toEqual({ name: "Alice", age: 23 });
        expect(results[2]).toEqual({ name: "Bob", age: NaN }); // why does this work? :(
        expect(results[3]).toEqual({ name: "Charlie", age: 25 });
        expect(results[4]).toEqual({ name: "Nim", age: 22 });
    }
});

test("parseCSV with commas in fields", async () => {
    const results = await parseCSV(path.join(__dirname, "../data/tests.csv"), CSVRowSchema2)
    if (results instanceof z.ZodError) {
        expect(true).toBe(false);
    } else {
        expect(results[1]).toEqual({ person: "julius", "year of birth": -100, quotes: "veni, vidi, vici" })
        expect(results[2]).toEqual({ person: "lincoln", "year of birth": 1809, quotes: "whatever you are, be a good one" })
    }
})

test("parseCSV with empty", async () => {
    const results = await parseCSV(path.join(__dirname, "../data/tests.csv"), CSVRowSchema2)
    if (results instanceof z.ZodError) {
        expect(true).toBe(false);
    } else {
        expect(results[3]).toEqual({ person: "me", "year of birth": 2006, quotes: "" })
    }
})

test("parseCSV with spaces", async () => {
    const results = await parseCSV(path.join(__dirname, "../data/tests.csv"), CSVRowSchema2)
    if (results instanceof z.ZodError) {
        expect(true).toBe(false);
    } else {
        expect(results[4]).toEqual({ person: "space", "year of birth": -13800000000, quotes: "  where  are  we  " })
    }
})