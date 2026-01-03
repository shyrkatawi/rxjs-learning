import type { Observable } from "rxjs";
import { from } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

type Options<State, Result> = {
  initialState: State;
  condition: (state: State) => boolean;
  iterate: (state: State) => State;
  resultSelector: (state: State) => Result;
};

const myGenerate = <State, Result>(options: Options<State, Result>): Observable<Result> => {
  return from(
    (function* gen() {
      for (
        let state = options.initialState;
        options.condition(state);
        state = options.iterate(state)
      ) {
        yield options.resultSelector(state);
      }
    })(),
  );
};

observeToConsole(
  myGenerate({
    initialState: 0,
    condition: (state) => state < 5,
    iterate: (state) => state + 1,
    resultSelector: (state) => state * 2,
  }),
);

observeToConsole(
  myGenerate({
    initialState: 1,
    condition: (state) => state < 10,
    iterate: (state) => state * 2,
    resultSelector: (state) => String(`Q${state}`),
  }),
);
