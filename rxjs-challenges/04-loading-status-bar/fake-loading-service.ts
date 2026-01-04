import { Injectable } from "@angular/core";
import { endWith, interval, map, Observable, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FakeLoadingService {
  public load(): Observable<number | string> {
    return interval(500).pipe(
      take(10),
      map((v) => v * 10),
      endWith("Fake load is done!"),
    );
  }
}
