import { Injectable, signal } from "@angular/core";
import { tap, timer } from "rxjs";

type Status = "pending" | "error" | "success" | "wait";

@Injectable({
  providedIn: "root",
})
export class ShowErrorMessageService {
  #status = signal<Status>("wait");
  #username = signal<string | undefined>(undefined);
  #error = signal<string | undefined>(undefined);

  public readonly status = this.#status.asReadonly();
  public readonly username = this.#username.asReadonly();
  public readonly error = this.#error.asReadonly();

  public emulateRequest(): void {
    if (this.#status() === "pending") {
      return;
    }

    this.#status.set("pending");

    timer(500)
      .pipe(
        tap(() => {
          if (Math.random() < 0.5) {
            this.#username.set("test_username");
            this.#error.set(undefined);
            this.#status.set("success");
          } else {
            this.#username.set(undefined);
            this.#error.set("Error message!");
            this.#status.set("error");
          }
        }),
      )
      .subscribe();
  }
}
