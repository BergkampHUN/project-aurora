import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GrouppedTimeEntries } from 'src/app/interfaces/mite';
import { HoursAndMinutesPipe } from 'src/app/pipes/hours-and-minutes.pipe';

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [CommonModule, HoursAndMinutesPipe],
  templateUrl: './time-entry.component.html',
  styleUrl: './time-entry.component.scss',
})
export class TimeEntryComponent {
  @Input({ required: true }) timeEntryGroup!: GrouppedTimeEntries;
  public collapsed: boolean = false;

  public lineClicked(): void {
    if (this.timeEntryGroup.entry) {
      return;
    }
    this.collapsed = !this.collapsed;
  }
}
