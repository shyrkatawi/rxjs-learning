import type { Observable, ObservableInput } from "rxjs";
import { of } from "rxjs";
import { from } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const myIf = <T, F>(
  condition: () => boolean,
  trueResult: ObservableInput<T>,
  falseResult: ObservableInput<F>,
): Observable<T | F> => {
  return from(condition() ? trueResult : falseResult);
};

observeToConsole(myIf(() => true, of("was true"), of("was false")));

observeToConsole(myIf(() => false, of("was true"), of("was false")));
