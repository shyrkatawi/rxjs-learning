import { Component } from "@angular/core";
import { Subtitles } from "../../../../rxjs-challenges/09-subtitles/subtitles";

@Component({
  selector: "app-main-page",
  imports: [Subtitles],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
