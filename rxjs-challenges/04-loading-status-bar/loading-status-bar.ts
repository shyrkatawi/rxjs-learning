import { Component, inject, OnDestroy, signal } from "@angular/core";
import { FakeLoadingService } from "./fake-loading-service";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-loading-status-bar",
  imports: [],
  templateUrl: "./loading-status-bar.html",
  styleUrl: "./loading-status-bar.css",
})
export class LoadingStatusBar implements OnDestroy {
  private readonly loadingService = inject(FakeLoadingService);
  private canselSubject$ = new Subject<null>();

  protected loadedData = signal<string | undefined>(undefined);
  protected loadedPercent = signal<number>(0);

  protected handleClick(): void {
    this.canselSubject$.next(null);
    this.loadedPercent.set(0);
    this.loadedData.set(undefined);

    this.loadingService
      .load()
      .pipe(
        tap((value: string | number) => {
          console.log(value);
          if (typeof value === "string") {
            this.loadedPercent.set(100);
            this.loadedData.set(value);
          } else {
            this.loadedPercent.set(value);
          }
        }),
        takeUntil(this.canselSubject$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.canselSubject$.next(null);
  }
}
