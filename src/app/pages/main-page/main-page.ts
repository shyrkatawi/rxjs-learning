import { Component } from "@angular/core";
import { ShowErrorMessage } from "../../../../rxjs-challenges/03-show-error-message/show-error-message";

@Component({
  selector: "app-main-page",
  imports: [ShowErrorMessage],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
