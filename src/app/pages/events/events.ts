import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventsService, EventResponse } from '../../../api/src';

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

  protected upcomingEvents = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.events().filter((ev) => {
      const d = new Date(ev.date);
      return d.getTime() >= today.getTime();
    });
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
