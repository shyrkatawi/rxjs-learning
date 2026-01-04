import { inject, Injectable } from "@angular/core";
import { distinctUntilChanged, fromEvent, map } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: "root" })
export class PageVisibilityService {
  private readonly documentRef = inject(DOCUMENT);

  public readonly pageVisibility = toSignal(
    fromEvent(this.documentRef, "visibilitychange").pipe(
      map(() => this.documentRef.visibilityState !== "hidden"),
      distinctUntilChanged(),
    ),
    { initialValue: this.documentRef.visibilityState !== "hidden" },
  );
}
