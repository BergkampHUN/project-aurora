import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MiteService } from '../services/mite.service';
import {
  GrouppedProject,
  Project,
  Service,
  TimeEntry,
  TimeEntryResponseObj,
  TrackingTimeEntryWithId,
} from '../interfaces/mite';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-working-on',
  templateUrl: './working-on.component.html',
  styleUrls: ['./working-on.component.scss'],
})
export class WorkingOnComponent implements OnInit {
  workingOnForm!: FormGroup;

  public projects: Project[] = [];
  public services: Service[] = [];
  public groupedProjects: GrouppedProject[] = [];
  public groupedServices: any[] = [];

  public currentTracker$: Subscription;
  public runningTimeEntry: TimeEntry | null = null;

  filterValue = '';

  constructor(private miteService: MiteService) {
    this.currentTracker$ = this.miteService.currentTracker$.subscribe((tracker) => {
      if (tracker && tracker.tracking_time_entry) {
        if (!this.runningTimeEntry || this.runningTimeEntry.id !== tracker.tracking_time_entry.id) {
          this.miteService
            .getTimeEntry(tracker.tracking_time_entry.id)
            .subscribe((res: TimeEntryResponseObj) => {
              this.runningTimeEntry = res.time_entry;
              this.setTimeEntryFields(res.time_entry);
            });
        }
      } else {
        if (this.runningTimeEntry) {
          this.workingOnForm.get('note')?.setValue('');
          this.runningTimeEntry = null;
        }
      }
    });
  }

  ngOnInit(): void {
    this.workingOnForm = new FormGroup({
      project: new FormControl(null, [Validators.required]),
      service: new FormControl(null),
      note: new FormControl(null),
    });

    this.miteService.getProjects().subscribe((res) => {
      this.projects = res;
      this.groupedProjects = this.groupProjectsByCustomer(res);
      console.log(this.groupedProjects);
    });

    this.miteService.getServices().subscribe((res) => {
      this.services = res;
      this.groupedServices = this.groupServices(res);
    });
  }

  toggleTimeEntry(): void {
    if (this.runningTimeEntry) {
      this.miteService.stopTracker(this.runningTimeEntry.id).subscribe(() => {
        this.workingOnForm.get('note')?.setValue('');
      });
    } else {
      const payload = this.workingOnForm.getRawValue();
      if (payload.project && payload.service) {
        const project_id = payload.project.project.id;
        const service_id = payload.service.service.id;
        const note = payload.note;
        if (project_id && service_id) {
          this.miteService
            .createTimeEntry({
              minutes: 0,
              note,
              project_id: project_id,
              service_id: service_id,
            })
            .subscribe((res) => {
              console.log(res);
              const now = new Date();
              this.miteService
                .startTracker(res.time_entry.id, {
                  tracker: {
                    tracking_time_entry: {
                      id: res.time_entry.id,
                      minutes: res.time_entry.minutes,
                      since: now.toISOString(),
                    },
                  },
                })
                .subscribe((res) => {
                  console.log(res);
                });
            });
        }
      }
    }
  }

  private groupProjectsByCustomer(projects: Project[]): any[] {
    const grouppedArray: any[] = [];
    projects.forEach((project) => {
      this.placeProjectInCustomerGroup(project.name, grouppedArray, project);
    });
    return grouppedArray;
  }

  private placeProjectInCustomerGroup(
    name: string,
    arrayPart: GrouppedProject[],
    project: Project
  ) {
    const splittedName = name.split(' / ');
    let customerName = splittedName[0];
    const rest = splittedName.slice(1).join(' / ');

    const foundIndex = arrayPart.findIndex((item) => item.name === customerName);
    if (foundIndex !== -1) {
      const foundItem = arrayPart[foundIndex];
      if (foundItem) {
        this.placeProjectInCustomerGroup(rest, foundItem.items || [], project);
      }
    } else {
      if (splittedName.length > 1) {
        arrayPart.push({
          name: customerName,
          items: [],
        });

        this.placeProjectInCustomerGroup(
          rest,
          arrayPart[arrayPart.length - 1].items || [],
          project
        );
      } else {
        const projectNameAndCode = this.splitProjectNameAndCode(customerName);
        const itemObj = {
          name: projectNameAndCode[0],
          code: projectNameAndCode[1],
          project,
        };

        arrayPart.push(itemObj);
      }
    }
  }

  private groupServices(services: Service[]): any[] {
    const grouppedArray: any[] = [];
    services.forEach((service) => {
      const elements = service.name.trim().split(' ');
      const countryCode = elements[0];
      const rest = elements.slice(1).join(' ');
      const foundIndex = grouppedArray.findIndex((item) => item.name === countryCode);

      if (foundIndex !== -1) {
        grouppedArray[foundIndex].items.push({
          name: rest,
          service,
        });
      } else {
        const country = this.getCountryNameFromCode(countryCode);
        grouppedArray.push({
          label: country.charAt(0).toUpperCase() + country.slice(1),
          name: countryCode,
          country,
          items: [
            {
              name: rest,
              service,
            },
          ],
        });
      }
    });
    return grouppedArray;
  }

  private getCountryNameFromCode(shortCode: string): string {
    let country = '';
    switch (shortCode) {
      case 'VIE':
        country = 'austria';
        break;
      case 'PRN':
        country = 'kosovo';
        break;
      case 'HRV':
        country = 'croatia';
        break;
    }
    return country;
  }

  private splitProjectNameAndCode(projectName: string) {
    const codeIndex = projectName.indexOf('ORINV');
    if (codeIndex > -1) {
      return [
        projectName.substring(0, codeIndex),
        projectName.substring(codeIndex, projectName.length),
      ];
    } else {
      return [projectName];
    }
  }

  private setTimeEntryFields(entry: TimeEntry): void {
    // GET PROJECT
    const foundProject = this.projects.find((project) => project.id === entry.project_id);
    let grouppedProject = {};
    if (foundProject) {
      const names = foundProject.name.split(' / ');
      const code = this.splitProjectNameAndCode(names[names.length - 1]);

      grouppedProject = {
        name: code[0],
        code: code[1],
        project: foundProject,
      };
    }

    // GET SERVICE
    const foundService = this.services.find((service) => service.id === entry.service_id);

    this.workingOnForm.patchValue({
      project: grouppedProject,
      service: {
        name: foundService?.name.split(' ')[1],
        service: foundService,
      },
      note: entry.note,
    });
  }
}
