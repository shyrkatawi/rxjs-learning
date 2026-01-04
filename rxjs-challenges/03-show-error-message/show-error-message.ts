import { Component, effect, inject, signal } from "@angular/core";
import { ShowErrorMessageService } from "./show-error-message.service";

@Component({
  selector: "app-show-error-message",
  imports: [],
  templateUrl: "./show-error-message.html",
  styleUrl: "./show-error-message.css",
})
export class ShowErrorMessage {
  private readonly showErrorMessageService = inject(ShowErrorMessageService);

  protected readonly error = this.showErrorMessageService.error;
  protected readonly username = this.showErrorMessageService.username;
  protected readonly status = this.showErrorMessageService.status;

  protected readonly isButtonDisabledAfterError = signal(false);

  constructor() {
    effect((onCleanup) => {
      let timeoutId: number;
      if (this.status() === "error") {
        this.isButtonDisabledAfterError.set(true);
        timeoutId = setTimeout(() => {
          this.isButtonDisabledAfterError.set(false);
        }, 1_000);
      }

      onCleanup(() => {
        clearTimeout(timeoutId);
      });
    });
  }

  protected handleClick() {
    this.showErrorMessageService.emulateRequest();
  }
}
