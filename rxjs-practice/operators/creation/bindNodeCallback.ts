import type { Observable } from "rxjs";
import { bindNodeCallback } from "rxjs";
import { readFile } from "node:fs";
import type { PathOrFileDescriptor } from "fs";
import type { ObjectEncodingOptions } from "fs";

// Task 1:
// readFile
const readFileAsObservable: (
  path: PathOrFileDescriptor,
  options?: ObjectEncodingOptions,
) => Observable<NonSharedBuffer> = bindNodeCallback(readFile);

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
