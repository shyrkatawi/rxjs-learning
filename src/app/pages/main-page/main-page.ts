import { Component } from "@angular/core";
import { CountdownWithRestart } from "../../../../rxjs-challenges/05-countdown-with-restart/countdown-with-restart";

@Component({
  selector: "app-main-page",
  imports: [CountdownWithRestart],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
