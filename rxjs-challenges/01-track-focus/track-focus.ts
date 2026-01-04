import { DestroyRef, Directive, ElementRef, inject, OnInit, output } from "@angular/core";
import { fromEvent, map, merge, startWith } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
  selector: "[appTrackFocus]",
})
export class TrackFocus implements OnInit {
  private readonly documentRef = inject(DOCUMENT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  public readonly appTrackFocus = output<Element | null>();

  ngOnInit(): void {
    const hostElement = this.elementRef.nativeElement;

    const focusIn$ = fromEvent<FocusEvent>(hostElement, "focusin").pipe(
      map((event) => event.target as Element),
    );

    const focusOut$ = fromEvent<FocusEvent>(hostElement, "focusout").pipe(
      map(() => {
        if (hostElement.contains(this.documentRef.activeElement)) {
          return this.documentRef.activeElement;
        }
        return null;
      }),
    );

    merge(focusIn$, focusOut$)
      .pipe(startWith(null), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.appTrackFocus.emit(value));
  }
}
