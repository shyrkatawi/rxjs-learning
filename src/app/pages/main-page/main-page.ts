import { Component } from "@angular/core";
import { FpsMeter } from "../../../../rxjs-challenges/19-fps-meter/fps-meter";

@Component({
  selector: "app-main-page",
  imports: [FpsMeter],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
