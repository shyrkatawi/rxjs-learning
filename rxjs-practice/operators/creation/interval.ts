import { Observable, take } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";
import { clearInterval } from "node:timers";

const myInterval = (period = 0): Observable<number> => {
  if (period < 0) {
    period = 0;
  }
  return new Observable((subscriber) => {
    let value = 0;

    const intervalId = setInterval(() => {
      if (subscriber.closed) {
        return;
      }
      subscriber.next(value);
      value++;
    }, period);

    return () => {
      clearInterval(intervalId);
    };
  });
};

observeToConsole(myInterval(1000).pipe(take(4)));
