import type { Subscription } from "rxjs";
import { zip } from "rxjs";
import { EMPTY, interval, map, Observable, take } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

type ObservableIndex = number;

const myZip = (...observables: Observable<unknown>[]): Observable<unknown> => {
  const length = observables.length;
  if (length === 0) {
    return EMPTY;
  }

  return new Observable((subscribe) => {
    const subscriptions = new Array<Subscription>(length);
    const unsubscribeAll = (): void => {
      subscriptions.forEach((s) => s.unsubscribe());
    };

    const storage = new Array<unknown[]>(length);
    for (let i = 0; i < storage.length; i++) {
      storage[i] = [];
    }

    const checkIsCompleted = (): boolean => {
      return completionState.every((v) => v);
    };
    const completionState = new Array<boolean>(length).fill(false);

    const shouldFireNext = (): boolean => {
      return storage.every((arr) => arr.length !== 0) && !checkIsCompleted();
    };

    const handleNext = (index: ObservableIndex, value: unknown): void => {
      storage[index].push(value);

      if (!shouldFireNext()) {
        return;
      }

      const nextValues = storage.reduce((acc, arr, index) => {
        acc[index] = arr.shift();
        return acc;
      }, new Array<unknown>(length));
      subscribe.next(nextValues);
    };

    for (let i = 0; i < length; i++) {
      subscriptions[i] = observables[i].subscribe({
        next: (value: unknown) => handleNext(i, value),
        error: (err: unknown) => {
          subscribe.error(err);
          unsubscribeAll();
        },
        complete: () => {
          completionState[i] = true;
          if (checkIsCompleted()) {
            subscribe.complete();
          }
        },
      });
    }

    return () => {
      unsubscribeAll();
    };
  });
};

const first$ = interval(1000).pipe(
  take(3),
  map((v) => `First: ${v}`),
);
const second$ = interval(100).pipe(
  take(3),
  map((v) => `Second: ${v}`),
);
const third$ = interval(500).pipe(
  take(3),
  map((v) => `Third: ${v}`),
);

observeToConsole(zip(first$, second$, third$).pipe(map(([f, s, t]) => ({ f, s, t }))));
observeToConsole(myZip(first$, second$, third$).pipe(map(([f, s, t]) => ({ f, s, t }))));
