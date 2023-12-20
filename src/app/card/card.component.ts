import { Component, Input, inject } from '@angular/core';
import { MiteService } from '../services/mite.service';
import { GrouppedTimeEntries } from '../interfaces/mite';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { HoursAndMinutesPipe } from '../pipes/hours-and-minutes.pipe';
import { NiceDateNamePipe } from '../pipes/nice-date-name.pipe';
import { ButtonModule } from 'primeng/button';
import { SummariesComponent } from './summaries/summaries.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TimeEntryComponent, NiceDateNamePipe, ButtonModule, SummariesComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input({ required: true }) date!: Date;
  @Input() dateSelector: boolean = false;

  public groupedTimeEntries: GrouppedTimeEntries[] = [];
  private readonly miteService: MiteService = inject(MiteService);

  constructor() {}

  ngOnInit() {
    this.getTimeEntries();
  }

  public changeDate(moveDays: number): void {
    if (!this.dateSelector) return;
    this.date = new Date(this.date.setDate(this.date.getDate() + moveDays));
    this.getTimeEntries();
  }

  private getTimeEntries(): void {
    this.miteService
      .getTimeEntries([{ type: 'at', value: this.date?.toLocaleDateString('sv') }])
      .subscribe((res) => {
        this.groupedTimeEntries = this.miteService.groupTimeEntries(res);
      });
  }
}
