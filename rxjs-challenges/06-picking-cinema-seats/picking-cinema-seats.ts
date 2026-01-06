import { Component, computed, signal } from "@angular/core";
import { NgClass } from "@angular/common";

enum SeatStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
}

type SeatId = number;

type SeatInfo = {
  id: SeatId;
  cost: number;
  status: SeatStatus;
};

const getRandomSeatStatus = (): SeatStatus => {
  return Math.random() < 0.5 ? SeatStatus.AVAILABLE : SeatStatus.BOOKED;
};

const generateSeats = (number: number): SeatInfo[] => {
  return Array.from({ length: number }, (_, index) => ({
    id: index,
    cost: Math.ceil(Math.random() * 100),
    status: getRandomSeatStatus(),
  }));
};

@Component({
  selector: "app-picking-cinema-seats",
  imports: [NgClass],
  templateUrl: "./picking-cinema-seats.html",
  styleUrl: "./picking-cinema-seats.css",
})
export class PickingCinemaSeats {
  protected readonly SeatStatus = SeatStatus;

  protected readonly seatsState = signal<SeatInfo[]>(generateSeats(10));
  protected readonly pendingSeats = signal(new Set<number>());

  protected readonly finalSeatsCost = computed(() => {
    const pendingSeats = this.pendingSeats();
    if (pendingSeats.size === 0) {
      return 0;
    }

    let total = 0;
    pendingSeats.forEach((seatIndex) => {
      const seat = this.seatsState()[seatIndex];
      total += seat.cost;
    });

    return total;
  });

  protected unselectAllSeats(): void {
    this.pendingSeats.set(new Set<number>());
  }

  protected getSitColor(seatIndex: number): string {
    if (this.pendingSeats().has(seatIndex)) {
      return "bg-yellow-300";
    }
    const seat = this.seatsState()[seatIndex];
    if (seat.status === SeatStatus.AVAILABLE) {
      return "bg-green-300";
    }
    return "bg-red-200";
  }

  protected handleCinemaSeatClick(seatIndex: number): void {
    const pendingSeatsCopy = new Set(this.pendingSeats());

    if (pendingSeatsCopy.has(seatIndex)) {
      pendingSeatsCopy.delete(seatIndex);
    } else {
      pendingSeatsCopy.add(seatIndex);
    }

    this.pendingSeats.set(pendingSeatsCopy);
  }

  protected handleBuySeats(): void {
    const pendingSeats = this.pendingSeats();
    if (pendingSeats.size === 0) {
      return;
    }

    const updatedSeats = this.seatsState().map((seat) => {
      if (pendingSeats.has(seat.id)) {
        return { ...seat, status: SeatStatus.BOOKED };
      }
      return seat;
    });

    this.seatsState.set(updatedSeats);
    this.pendingSeats.set(new Set<number>());
  }
}
