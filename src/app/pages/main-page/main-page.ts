import { Component } from "@angular/core";
import { PickingCinemaSeats } from "../../../../rxjs-challenges/06-picking-cinema-seats/picking-cinema-seats";

@Component({
  selector: "app-main-page",
  imports: [PickingCinemaSeats],
  templateUrl: "./main-page.html",
  styleUrl: "./main-page.css",
})
export class MainPage {}
