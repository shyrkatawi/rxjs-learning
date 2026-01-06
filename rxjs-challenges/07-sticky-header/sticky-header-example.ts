import { Component } from "@angular/core";
import { RepeatPipe } from "../../src/app/pipes/repeat-pipe";
import { StickyHeader } from "./sticky-header";

@Component({
  selector: "app-sticky-header-example",
  imports: [RepeatPipe, StickyHeader],
  templateUrl: "./sticky-header-example.html",
})
export class StickyHeaderExample {}
