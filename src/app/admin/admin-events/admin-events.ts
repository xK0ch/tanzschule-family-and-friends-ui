import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  EventsService,
  EventResponse,
  EventTimeRangeRequest,
} from '../../../api/src';

@Component({
  selector: 'app-admin-events',
  imports: [
    DatePipe,
    DecimalPipe,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-events.html',
  styleUrl: './admin-events.scss',
})
export class AdminEvents implements OnInit {
  private readonly eventsService = inject(EventsService);
  private readonly snackBar = inject(MatSnackBar);

  protected events = signal<EventResponse[]>([]);
  protected showNewEventForm = signal(false);
  protected editingEventId = signal<string | null>(null);

  // New event form fields
  protected newEventName = '';
  protected newEventDate = '';
  protected newEventEntryCost: number | null = null;
  protected newEventEntryCostWithCustomerCard: number | null = null;
  protected newEventRemark = '';
  protected newEventTimeRanges: EventTimeRangeRequest[] = [];

  // Edit event form fields
  protected editEventName = '';
  protected editEventDate = '';
  protected editEventEntryCost: number | null = null;
  protected editEventEntryCostWithCustomerCard: number | null = null;
  protected editEventRemark = '';
  protected editEventTimeRanges: EventTimeRangeRequest[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  protected loadEvents(): void {
    this.eventsService.getAll4().subscribe({
      next: (events) => this.events.set(events),
      error: () => this.showMessage('Fehler beim Laden der Veranstaltungen.'),
    });
  }

  protected toggleNewEventForm(): void {
    this.showNewEventForm.set(!this.showNewEventForm());
    if (this.showNewEventForm()) {
      this.resetNewEventForm();
    }
  }

  private resetNewEventForm(): void {
    this.newEventName = '';
    this.newEventDate = '';
    this.newEventEntryCost = null;
    this.newEventEntryCostWithCustomerCard = null;
    this.newEventRemark = '';
    this.newEventTimeRanges = [];
  }

  protected createEvent(): void {
    if (!this.newEventName.trim() || !this.newEventDate) return;

    const timeRanges = this.newEventTimeRanges.filter((t) => t.startTime && t.endTime);

    this.eventsService
      .create5({
        body: {
          name: this.newEventName,
          date: this.newEventDate,
          entryCost: this.newEventEntryCost != null ? this.newEventEntryCost : undefined,
          entryCostWithCustomerCard:
            this.newEventEntryCostWithCustomerCard != null
              ? this.newEventEntryCostWithCustomerCard
              : undefined,
          remark: this.newEventRemark.trim() ? this.newEventRemark : undefined,
          timeRanges,
        },
      })
      .subscribe({
        next: () => {
          this.showMessage('Veranstaltung erstellt.');
          this.showNewEventForm.set(false);
          this.loadEvents();
        },
        error: () => this.showMessage('Fehler beim Erstellen.'),
      });
  }

  protected startEditEvent(event: EventResponse): void {
    this.editingEventId.set(event.id);
    this.editEventName = event.name;
    this.editEventDate = event.date;
    this.editEventEntryCost = event.entryCost != null ? Number(event.entryCost) : null;
    this.editEventEntryCostWithCustomerCard =
      event.entryCostWithCustomerCard != null ? Number(event.entryCostWithCustomerCard) : null;
    this.editEventRemark = event.remark ?? '';
    this.editEventTimeRanges = event.timeRanges.map((t) => ({
      startTime: t.startTime.substring(0, 5),
      endTime: t.endTime.substring(0, 5),
    }));
  }

  protected cancelEditEvent(): void {
    this.editingEventId.set(null);
  }

  protected saveEvent(event: EventResponse): void {
    if (!this.editEventName.trim() || !this.editEventDate) return;

    const timeRanges = this.editEventTimeRanges.filter((t) => t.startTime && t.endTime);

    this.eventsService
      .update5({
        id: event.id,
        body: {
          name: this.editEventName,
          date: this.editEventDate,
          entryCost: this.editEventEntryCost != null ? this.editEventEntryCost : undefined,
          entryCostWithCustomerCard:
            this.editEventEntryCostWithCustomerCard != null
              ? this.editEventEntryCostWithCustomerCard
              : undefined,
          remark: this.editEventRemark.trim() ? this.editEventRemark : undefined,
          timeRanges,
        },
      })
      .subscribe({
        next: () => {
          this.showMessage('Veranstaltung aktualisiert.');
          this.editingEventId.set(null);
          this.loadEvents();
        },
        error: () => this.showMessage('Fehler beim Speichern.'),
      });
  }

  protected deleteEvent(event: EventResponse): void {
    if (!confirm(`Veranstaltung "${event.name}" wirklich löschen?`)) return;
    this.eventsService.delete5({ id: event.id }).subscribe({
      next: () => {
        this.showMessage('Veranstaltung gelöscht.');
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
    });
  }

  protected moveEventUp(index: number): void {
    if (index <= 0) return;
    const ids = this.events().map((e) => e.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    this.reorderEvents(ids);
  }

  protected moveEventDown(index: number): void {
    const ids = this.events().map((e) => e.id);
    if (index >= ids.length - 1) return;
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    this.reorderEvents(ids);
  }

  private reorderEvents(ids: string[]): void {
    this.eventsService.reorder4({ body: ids }).subscribe({
      next: () => this.loadEvents(),
      error: () => this.showMessage('Fehler beim Sortieren.'),
    });
  }

  // ── Time ranges ──

  protected addNewTimeRange(): void {
    this.newEventTimeRanges.push({ startTime: '', endTime: '' });
  }

  protected removeNewTimeRange(index: number): void {
    this.newEventTimeRanges.splice(index, 1);
  }

  protected addEditTimeRange(): void {
    this.editEventTimeRanges.push({ startTime: '', endTime: '' });
  }

  protected removeEditTimeRange(index: number): void {
    this.editEventTimeRanges.splice(index, 1);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
