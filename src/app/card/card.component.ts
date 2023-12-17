import { Component, Input, inject } from '@angular/core';
import { MiteService } from '../services/mite.service';
import { GrouppedTimeEntries } from '../interfaces/mite';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { HoursAndMinutesPipe } from '../pipes/hours-and-minutes.pipe';
import { NiceDateNamePipe } from '../pipes/nice-date-name.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    TimeEntryComponent,
    HoursAndMinutesPipe,
    NiceDateNamePipe,
    ButtonModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input({ required: true }) date!: Date;
  @Input() dateSelector: boolean = false;
  data: any;
  chartOptions: any;
  public groupedTimeEntries: GrouppedTimeEntries[] = [];
  public totalTrackedMinutes: number = 0;
  private readonly miteService: MiteService = inject(MiteService);

  constructor() {}

  ngOnInit() {
    this.getTimeEntries();
    this.data = {
      datasets: [
        {
          data: [66, 0, 34],
          // maybe create a variable service for the colors //
          backgroundColor: ['#c3edf5', '#eafd62', '#ead6fd'],
          hoverBackgroundColor: ['#c3edf5', '#eafd62', '#ead6fd'],
        },
      ],
    };
  }

  public changeDate(moveDays: number): void {
    if (!this.dateSelector) return;
    this.date = new Date(this.date.setDate(this.date.getDate() + moveDays));
    this.getTimeEntries();
  }

  private getTimeEntries(): void {
    this.miteService.getTimeEntries(this.date?.toLocaleDateString('sv')).subscribe((res) => {
      this.groupedTimeEntries = this.miteService.groupTimeEntries(res);
      this.totalTrackedMinutes = this.calculateTotalTrackedMinutes();
    });
  }

  private calculateTotalTrackedMinutes(): number {
    return this.groupedTimeEntries.reduce((acc, curr) => acc + curr.minutes, 0);
  }
}
