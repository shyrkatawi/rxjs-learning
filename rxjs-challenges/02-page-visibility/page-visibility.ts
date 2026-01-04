import { inject, InjectionToken, Signal } from "@angular/core";
import { distinctUntilChanged, fromEvent, map } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

export const PAGE_VISIBILITY = new InjectionToken<Signal<boolean>>("Page Visibility Signal", {
  providedIn: "root",
  factory: () => {
    const documentRef = inject(DOCUMENT);
    return toSignal(
      fromEvent(documentRef, "visibilitychange").pipe(
        map(() => documentRef.visibilityState !== "hidden"),
        distinctUntilChanged(),
      ),
      { initialValue: documentRef.visibilityState !== "hidden" },
    );
  },
});
