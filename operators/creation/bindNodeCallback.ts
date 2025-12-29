import { bindNodeCallback } from "rxjs";
import { readFile } from "node:fs";

// Task 1:
// readFile
const readFileAsObservable = bindNodeCallback(readFile);

readFileAsObservable("./bindCallback.ts", { encoding: "utf-8" }).subscribe({
  next: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.error("Error reading file:", err);
  },
  complete: () => {
    console.log("File read complete.");
  },
});
