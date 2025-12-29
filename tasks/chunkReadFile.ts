import { createReadStream } from "fs";
import { Observable, Subject } from "rxjs";
import type { PathLike } from "node:fs";

// Task 1:
// create Observable that read a file in chunks :)

type ReadStreamOptions = {
  flags?: string;
  encoding?: BufferEncoding;
  fd?: number;
  mode?: number;
  autoClose?: boolean;
  emitClose?: boolean;
  start?: number;
  end?: number;
  highWaterMark?: number;
};

const task1 = () => {
  const createObservableReadStream = (path: PathLike, options: ReadStreamOptions) => {
    return new Observable((subscribe) => {
      const readStream = createReadStream(path, options);

      readStream.on("data", (chunk) => subscribe.next(chunk));
      readStream.on("error", (err) => subscribe.error(err));
      readStream.on("end", () => subscribe.complete());

      return () => {
        readStream.close();
      };
    });
  };

  const readStream$ = createObservableReadStream("./chunkReadFile.ts", {
    encoding: "utf8",
    highWaterMark: 32,
  });

  readStream$.subscribe({
    next: (chunk) => console.log("Task 1, 1Received chunk:", chunk),
    error: (err) => console.error("Task 1, 1Error reading file:", err),
    complete: () => console.log("Task 1, 1Finished reading file."),
  });
};

task1();

// Task 2:
// create Subject that read a file in chunks :)
const task2 = () => {
  const createObservableSubjectReadStream = (path: PathLike, options: ReadStreamOptions) => {
    const subject$ = new Subject<string>();
    const readStream = createReadStream(path, options);

    readStream.on("data", (chunk) => subject$.next(String(chunk)));
    readStream.on("error", (err) => subject$.error(err));
    readStream.on("end", () => subject$.complete());

    return subject$;
  };

  const readStreamSubject$ = createObservableSubjectReadStream("./chunkReadFile.ts", {
    encoding: "utf8",
    highWaterMark: 32,
  });

  readStreamSubject$.subscribe({
    next: (chunk) => console.log("Task 2, 1Received chunk:", chunk),
    error: (err) => console.error("Task 2, 1Error reading file:", err),
    complete: () => console.log("Task 2, 1Finishing"),
  });

  setTimeout(() => {
    readStreamSubject$.subscribe({
      next: (chunk) => console.log("Task 2, 2Received chunk:", chunk),
      error: (err) => console.error("Task 2, 2Error reading file:", err),
      complete: () => console.log("Task 2, 2Finishing"),
    });
  }, 1_000);
};

task2();
