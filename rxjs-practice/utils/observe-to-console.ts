import type { Observable } from "rxjs";

export const observeToConsole = <T>(observable: Observable<T>): void => {
  observable.subscribe({
    next: (value: T) => console.log("Next:", value),
    error: (err: unknown) => console.error("Error:", err),
    complete: () => console.log("Completed"),
  });
};
