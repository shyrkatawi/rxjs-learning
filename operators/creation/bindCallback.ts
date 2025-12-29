import type { SchedulerLike } from "rxjs";
import { asapScheduler, asyncScheduler, bindCallback, queueScheduler } from "rxjs";

// Task 1:
// Using bindCallback, wrap a function wait(ms, cb) that calls cb after ms milliseconds
const wait = (ms: number, cb: (value: number) => void): void => {
  setTimeout(() => cb(ms), ms);
};

const waitWrapper = bindCallback(wait);

waitWrapper(1000).subscribe({
  next: (value: number) => console.log(`Task 1: Waited ${value} ms`),
  error: (err) => console.error("Task 1: Error :", err),
  complete: () => console.log("Task 1: Complete after waiting"),
});

// Task 2:
// Factory creators using bindCallback with different schedulers
const logFn = (v: string) => {
  console.log(v);
};

type SchedulerType = "asap" | "async" | "queue";
const logFactory = (schedulerType?: SchedulerType) => {
  const schedulers: Record<SchedulerType, SchedulerLike> = {
    asap: asapScheduler,
    async: asyncScheduler,
    queue: queueScheduler,
  } as const;

  return bindCallback(logFn, undefined, schedulers[schedulerType]);
};

const asapLog = logFactory("asap");
const asyncLog = logFactory("async");
const queueLog = logFactory("queue");
const notProvidedSchedulerType = logFactory();

asapLog("Task2: Logging with asap scheduler 1").subscribe();
asyncLog("Task2: Logging with async scheduler 1 ").subscribe();
queueLog("Task2: Logging with queue scheduler 1").subscribe();
notProvidedSchedulerType("Task2: Logging with not Provided Scheduler Type 1").subscribe();

asapLog("Task2: Logging with asap scheduler 2").subscribe();
asyncLog("Task2: Logging with async scheduler 2 ").subscribe();
queueLog("Task2: Logging with queue scheduler 2").subscribe();
notProvidedSchedulerType("Task2: Logging with not Provided Scheduler Type scheduler 2").subscribe();
