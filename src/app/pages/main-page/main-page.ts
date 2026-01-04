import { Component } from "@angular/core";
import { LoadingStatusBar } from "../../../../rxjs-challenges/04-loading-status-bar/loading-status-bar";

@Component({
  selector: "app-main-page",
  imports: [LoadingStatusBar],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
