import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  EventsService,
  EventResponse,
  EventTimeRangeRequest,
  EventCleanupConfigService,
} from '../../../api/src';

interface MonthGroup {
  key: string;
  anchorDate: string;
  events: EventResponse[];
}

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
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-events.html',
  styleUrl: './admin-events.scss',
})
export class AdminEvents implements OnInit {
  private readonly eventsService = inject(EventsService);
  private readonly cleanupConfigService = inject(EventCleanupConfigService);
  private readonly snackBar = inject(MatSnackBar);

  protected events = signal<EventResponse[]>([]);
  protected showNewEventForm = signal(false);
  protected editingEventId = signal<string | null>(null);

  protected cleanupEnabled = signal(true);
  protected cleanupLoaded = signal(false);

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

  ngOnInit(): void {
    this.loadEvents();
    this.loadCleanupConfig();
  }

  protected loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (events) => this.events.set(events),
      error: () => this.showMessage('Fehler beim Laden der Veranstaltungen.'),
    });
  }

  protected loadCleanupConfig(): void {
    this.cleanupConfigService.getEventCleanupConfig().subscribe({
      next: (config) => {
        this.cleanupEnabled.set(config.enabled);
        this.cleanupLoaded.set(true);
      },
      error: () => this.showMessage('Fehler beim Laden der Cleanup-Konfiguration.'),
    });
  }

  protected onCleanupToggle(enabled: boolean): void {
    this.cleanupEnabled.set(enabled);
    this.cleanupConfigService
      .updateEventCleanupConfig({ body: { enabled } })
      .subscribe({
        next: (config) => {
          this.cleanupEnabled.set(config.enabled);
          this.showMessage(
            config.enabled
              ? 'Automatische Bereinigung aktiviert.'
              : 'Automatische Bereinigung deaktiviert.'
          );
        },
        error: () => {
          // rollback
          this.cleanupEnabled.set(!enabled);
          this.showMessage('Fehler beim Speichern der Einstellung.');
        },
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
      .createEvent({
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
      .updateEvent({
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
    this.eventsService.deleteEvent({ id: event.id }).subscribe({
      next: () => {
        this.showMessage('Veranstaltung gelöscht.');
        this.loadEvents();
      },
      error: () => this.showMessage('Fehler beim Löschen.'),
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

  protected formatTime(time: string): string {
    return time.substring(0, 5);
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
