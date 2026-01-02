import { observeToConsole } from "../../utils/observe-to-console";
import { from } from "rxjs";

observeToConsole(from([1, 2, 3]));

observeToConsole(
  from(
    (function* gen() {
      yield 4;
      yield 5;
      yield 6;
    })(),
  ),
);

observeToConsole(
  from(
    (async function* asyncGen() {
      yield "x";
      yield "y";
      yield "z";
    })(),
  ),
);

observeToConsole(from(new Set(["a", "b", "c"])));

observeToConsole(from("hello"));

observeToConsole(from(Promise.resolve("Resolved Value")));

observeToConsole(
  from(
    new Map([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]),
  ),
);
