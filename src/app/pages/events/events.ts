import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventsService, EventResponse } from '../../../api/src';

interface MonthGroup {
  key: string;
  anchorDate: string;
  events: EventResponse[];
}

@Component({
  selector: 'app-events',
  imports: [DatePipe, DecimalPipe, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  private readonly eventsService = inject(EventsService);

  protected events = signal<EventResponse[]>([]);
  protected loading = signal(true);
  protected error = signal(false);

  protected eventsByMonth = computed<MonthGroup[]>(() => {
    const groups = new Map<string, EventResponse[]>();
    for (const ev of this.events()) {
      const key = ev.date.substring(0, 7); // "YYYY-MM"
      const bucket = groups.get(key);
      if (bucket) {
        bucket.push(ev);
      } else {
        groups.set(key, [ev]);
      }
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, events]) => ({
        key,
        anchorDate: `${key}-01`,
        events,
      }));
  });

  constructor() {
    this.eventsService.getAllEvents().subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected formatTime(time: string): string {
    return time.substring(0, 5);
  }
}
