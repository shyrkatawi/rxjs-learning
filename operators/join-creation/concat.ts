import type { Subscription } from "rxjs";
import { EMPTY, interval, Observable, range, take } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myConcat = <T>(...inputs: Observable<T>[]): Observable<T> => {
  if (inputs.length === 0) {
    return EMPTY;
  }
  return new Observable((subscribe) => {
    let currentIndex = 0;
    let innerSubscription: Subscription;

    const subscribeToNext = () => {
      if (currentIndex >= inputs.length) {
        subscribe.complete();
        return;
      }

      innerSubscription = inputs[currentIndex].subscribe({
        next: (value: T) => {
          subscribe.next(value);
        },
        error: (err: unknown) => {
          subscribe.error(err);
        },
        complete: () => {
          currentIndex++;
          subscribeToNext();
        },
      });
    };

    subscribeToNext();

    return () => {
      innerSubscription?.unsubscribe();
    };
  });
};

const timer = interval(1000).pipe(take(4));
const sequence = range(1, 10);

// observeToConsole(concat(timer, sequence));
observeToConsole(myConcat(timer, sequence));
