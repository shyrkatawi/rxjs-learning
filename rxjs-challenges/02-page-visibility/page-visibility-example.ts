import { Component, effect, inject } from "@angular/core";
import { PAGE_VISIBILITY } from "./page-visibility";

@Component({
  selector: "app-page-visibility-example",
  imports: [],
  templateUrl: "./page-visibility-example.html",
})
export class PageVisibilityExample {
  // protected readonly pageVisibility = inject(PageVisibilityService).pageVisibility;
  protected readonly pageVisibility = inject(PAGE_VISIBILITY);

  constructor() {
    effect(() => {
      console.log("Page visibility changed:", this.pageVisibility());
    });
  }
}
