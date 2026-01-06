import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import { SmartSearchService } from "./smart-search-service";

@Component({
  selector: "app-smart-search",
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: "./smart-search.html",
  styleUrl: "./smart-search.css",
})
export class SmartSearch {
  private readonly smartSearchService = inject(SmartSearchService);
  protected readonly control = new FormControl<string>("", { nonNullable: true });
  protected readonly items$ = this.control.valueChanges.pipe(this.smartSearchService.smartSearch());
}
