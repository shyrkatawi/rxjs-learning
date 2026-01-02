import { Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const MY_EMPTY = new Observable<never>((subscriber) => {
  subscriber.complete();
});

observeToConsole(MY_EMPTY);
