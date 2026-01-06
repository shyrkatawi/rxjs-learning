import { Component, DOCUMENT, inject, input } from "@angular/core";
import { distinctUntilChanged, fromEvent, map, throttleTime } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-sticky-header",
  imports: [AsyncPipe],
  templateUrl: "./sticky-header.html",
  styleUrl: "sticky-header.css",
})
export class StickyHeader {
  public fromTopBeforeHide = input(100);

  private readonly documentRef = inject(DOCUMENT);

  protected readonly isHidden$ = fromEvent(this.documentRef, "scroll").pipe(
    throttleTime(50),
    map(() => this.documentRef.documentElement.scrollTop > this.fromTopBeforeHide()),
    distinctUntilChanged(),
  );
}
