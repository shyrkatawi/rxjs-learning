import { Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myOf = <T>(...arr: T[]): Observable<T> => {
  return new Observable((subscribe) => {
    for (let i = 0; i < arr.length; i++) {
      if (subscribe.closed) {
        return;
      }
      subscribe.next(arr[i]);
    }
    subscribe.complete();
  });
};

observeToConsole(myOf(null));
observeToConsole(myOf(1, 2, 3));
