import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PickingCinemaSeats } from "./picking-cinema-seats";

describe("PickingCinemaSeats", () => {
  let component: PickingCinemaSeats;
  let fixture: ComponentFixture<PickingCinemaSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickingCinemaSeats],
    }).compileComponents();

    fixture = TestBed.createComponent(PickingCinemaSeats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
