import { Component, signal } from "@angular/core";
import { TrackFocus } from "./track-focus";

@Component({
  selector: "app-track-focus-example",
  imports: [TrackFocus],
  templateUrl: "./track-focus-example.html",
})
export class TrackFocusExample {
  #focusedElement = signal<Element | null>(null);

  protected readonly focusedElement = this.#focusedElement.asReadonly();

  onFocusChange(value: Element | null): void {
    this.#focusedElement.set(value);
  }
}
