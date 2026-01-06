import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "repeat",
  standalone: true,
})
export class RepeatPipe implements PipeTransform {
  public transform(value: unknown, count: number): string {
    return String(value).repeat(count);
  }
}
