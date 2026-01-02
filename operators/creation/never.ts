import { Observable } from "rxjs";
import { observeToConsole } from "../../utils/observe-to-console";

const MY_NEVER = new Observable<never>(() => {});

observeToConsole(MY_NEVER);
