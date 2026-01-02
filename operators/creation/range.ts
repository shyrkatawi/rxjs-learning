import { EMPTY, Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myRange = (start: number, count: number = 0): Observable<number> => {
  if (count <= 0) {
    return EMPTY;
  }
  const end = start + count;

  return new Observable((subscribe) => {
    for (let value = start; value < end; value++) {
      subscribe.next(value);
    }
    subscribe.complete();
  });
};

observeToConsole(myRange(1));
observeToConsole(myRange(1, 3));
