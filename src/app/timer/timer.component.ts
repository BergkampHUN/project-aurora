import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MiteService } from '../services/mite.service';
import { Subscription } from 'rxjs';
import { TrackingTimeEntryWithId } from '../interfaces/mite';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  public type!: 'mite' | 'timetac';

  public hour: any = '0' + 0;
  public minute: any = '0' + 0;

  public startTimer: any;
  public running = false;

  public currentTracker$!: Subscription;

  constructor(private miteService: MiteService) {}

  ngOnInit(): void {
    if (this.type === 'mite') {
      this.currentTracker$ = this.miteService.currentTracker$.subscribe((tracker) => {
        if (tracker && tracker.tracking_time_entry) {
          console.log(tracker);
          this.formatMiteResponse(tracker.tracking_time_entry);
        } else {
          this.clearTimer();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.currentTracker$.unsubscribe();
  }

  private formatMiteResponse(entry: TrackingTimeEntryWithId): void {
    const minutes = entry.minutes;
    const hours = Math.floor(minutes / 60).toString();
    const remainingMinutes = (minutes % 60).toString();
    this.hour = hours.padStart(2, '0');
    this.minute = remainingMinutes.padStart(2, '0');
  }

  private clearTimer(): void {
    this.hour = '0'.padStart(2, '0');
    this.minute = '0'.padStart(2, '0');
  }
}
