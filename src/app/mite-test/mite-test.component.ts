import { Component } from '@angular/core';
import {
  Project,
  Service,
  TimeEntry,
  TimeEntryResponseObj,
  TrackerResponse,
  User,
} from '../interfaces/mite';
import { MiteService } from '../services/mite.service';

@Component({
  selector: 'app-mite-test',
  templateUrl: './mite-test.component.html',
  styleUrls: ['./mite-test.component.scss'],
})
export class MiteTestComponent {
  public projects: Project[] = [];
  public services: Service[] = [];
  public tracker!: TrackerResponse;
  public timeEntries: TimeEntryResponseObj[] = [];
  public timeEntries2: TimeEntryResponseObj[] = [];
  public timeEntry!: TimeEntryResponseObj;
  public myself!: User;
  public note: string = '';

  constructor(private miteService: MiteService) {
    // TODO: add error handling
    this.miteService.getProjects().subscribe((res) => {
      this.projects = res;
    });
    this.miteService.getServices().subscribe((res) => {
      this.services = res;
    });
    this.miteService.getTracker().subscribe((res) => {
      this.tracker = res;
    });
    this.miteService.getTimeEntries().subscribe((res) => {
      this.timeEntries = res;
    });
    this.miteService.getTimeEntries('2023-01-20').subscribe((res) => {
      this.timeEntries2 = res;
    });
    this.miteService.getTimeEntry(113157544).subscribe((res) => {
      this.timeEntry = res;
    });
    this.miteService.getMyself().subscribe((res) => {
      this.myself = res.user;
    });
  }

  createTimeEntry(): void {
    this.miteService
      .createTimeEntry({
        minutes: 100,
        note: 'from frontend',
        project_id: 3676983,
        service_id: 509267,
      })
      .subscribe((res) => {
        this.timeEntries.push(res);
      });
  }

  editTimeEntry(): void {
    this.miteService
      .editTimeEntry(113157544, {
        note: this.note,
      })
      .subscribe(() => {
        // TODO: find the existing time entry on the page and edit it with the new value
      });
  }

  deleteTimeEntry(id: number): void {
    // NOTE: don't delete this time entry, it's needed for testing purpuses
    if (id === 113157544) {
      return;
    }
    this.miteService.deleteTimeEntry(id).subscribe(() => {
      // TODO: find the existing time entry on the page and delete it
    });
  }

  startTracker(id: number, timeEntry: TimeEntry): void {
    const now = new Date();

    this.miteService
      .startTracker(id, {
        tracker: {
          tracking_time_entry: {
            id: timeEntry.id,
            minutes: timeEntry.minutes,
            since: now.toISOString(),
          },
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  stopTracker(tracker: TrackerResponse) {
    this.miteService.stopTracker(tracker).subscribe((res) => {
      console.log(res);
    });
  }
}
