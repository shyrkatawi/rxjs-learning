import { Component } from "@angular/core";
import { TrackFocusExample } from "../../../../rxjs-challenges/01-track-focus/track-focus-example";

@Component({
  selector: "app-main-page",
  imports: [TrackFocusExample],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
