import { Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myThrowError = (errorFactory: () => unknown): Observable<never> => {
  return new Observable((subscribe) => {
    subscribe.error(errorFactory());
  });
};

observeToConsole(myThrowError(() => 1));
