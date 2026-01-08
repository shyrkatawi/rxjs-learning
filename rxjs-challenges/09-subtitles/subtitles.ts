import { Component } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";

type Subtitle = {
  text: string;
  duration: number;
};

const SUBTITLES: Subtitle[] = [
  {
    text: "It had a beginning",
    duration: 1000,
  },
  {
    text: "It must have an end",
    duration: 1500,
  },
  {
    text: "Don't leave me in darkness",
    duration: 1000,
  },
  {
    text: "Please give me your hand",
    duration: 2000,
  },
] as const;

const getSubtitlesObservable = (subtitles: Subtitle[] = SUBTITLES): Observable<Subtitle[]> => {
  return new Observable((subscribe) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const getSubtitles = () => {
      if (currentIndex >= subtitles.length) {
        subscribe.next([]);
        subscribe.complete();
        return;
      }

      const currentSubtitle = subtitles[currentIndex];

      currentIndex = currentIndex + 1;

      subscribe.next(
        currentIndex >= subtitles.length
          ? [currentSubtitle]
          : [currentSubtitle, subtitles[currentIndex]],
      );

      timeoutId = setTimeout(getSubtitles, currentSubtitle.duration);
    };

    getSubtitles();

    return () => {
      clearTimeout(timeoutId);
    };
  });
};

@Component({
  selector: "app-subtitles",
  imports: [AsyncPipe],
  templateUrl: "./subtitles.html",
})
export class Subtitles {
  protected readonly subtitles$ = getSubtitlesObservable().pipe(tap(console.log));
}
