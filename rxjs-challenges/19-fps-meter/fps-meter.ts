import { Component } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";

const fibonacci = (num: number): number => {
  return num > 1 ? fibonacci(num - 1) + fibonacci(num - 2) : 1;
};

const getFpsObservable = (): Observable<number> => {
  return new Observable((subscribe) => {
    let animationId: number;
    let frames = 0;

    const addFrame = (): void => {
      animationId = requestAnimationFrame(() => {
        frames++;
        addFrame();
      });
    };

    addFrame();

    const intervalId = setInterval(() => {
      cancelAnimationFrame(animationId);
      addFrame();
      subscribe.next(frames);
      frames = 0;
    }, 1_000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    };
  });
};

@Component({
  selector: "app-fps-meter",
  imports: [AsyncPipe],
  templateUrl: "./fps-meter.html",
})
export class FpsMeter {
  protected readonly fps$ = getFpsObservable().pipe(tap(console.log));

  protected onMouseMove(): void {
    // Let's just introduce lag by heavy calculations
    console.log(fibonacci(33));
  }
}
