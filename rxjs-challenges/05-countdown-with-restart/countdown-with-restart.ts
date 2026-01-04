import { Component, DestroyRef, inject, signal } from "@angular/core";
import { map, takeWhile, tap, timer } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-countdown-with-restart",
  imports: [],
  templateUrl: "./countdown-with-restart.html",
  styleUrl: "./countdown-with-restart.css",
})
export class CountdownWithRestart {
  private readonly duration = 5;
  private readonly destroyRef = inject(DestroyRef);

  protected readonly countdown = signal<number>(0);

  protected handleButtonClick() {
    timer(0, 500)
      .pipe(
        map((index) => this.duration - index),
        tap((v) => {
          this.countdown.set(v);
        }),
        takeWhile(Boolean, true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
