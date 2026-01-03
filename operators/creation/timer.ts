import { Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myTimer = (due: number | Date): Observable<0> => {
  return new Observable((subscribe) => {
    const now = new Date().getTime();
    const dueTime = due instanceof Date ? due.getTime() : now + due;
    const delay = Math.max(dueTime - now, 0);

    const timeoutId = setTimeout(() => {
      subscribe.next(0);
      subscribe.complete();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  });
};

observeToConsole(myTimer(1000));
observeToConsole(myTimer(new Date(new Date().getTime() + 2000)));
