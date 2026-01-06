import { Injectable } from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  OperatorFunction,
  switchMap,
} from "rxjs";

function requestBackendEmulation(search: string): Observable<readonly string[]> {
  console.log("backend called", search);
  const tests = ["test1", "test2", "test3"].filter((test) => !!search && test.startsWith(search));
  if (tests.length) {
    return of(tests);
  }
  const numbers = ["125", "12", "199", "200", "250"].filter(
    (number) => !!search && number.startsWith(search),
  );
  if (numbers.length) {
    return of(numbers);
  }
  return of([]);
}

@Injectable({
  providedIn: "root",
})
export class SmartSearchService {
  public smartSearch(): OperatorFunction<string, readonly string[]> {
    return (source) =>
      source.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => requestBackendEmulation(value)),
      );
  }
}
