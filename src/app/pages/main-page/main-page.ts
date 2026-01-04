import { Component } from "@angular/core";
import { PageVisibilityExample } from "../../../../rxjs-challenges/02-page-visibility/page-visibility-example";

@Component({
  selector: "app-main-page",
  imports: [PageVisibilityExample],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
