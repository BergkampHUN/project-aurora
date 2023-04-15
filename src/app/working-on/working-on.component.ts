import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MiteService } from '../services/mite.service';
import { Project, Service } from '../interfaces/mite';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-working-on',
  templateUrl: './working-on.component.html',
  styleUrls: ['./working-on.component.scss'],
})
export class WorkingOnComponent implements OnInit {
  workingOnForm!: FormGroup;

  public projects: Project[] = [];
  public services: Service[] = [];
  public groupedProjects: any[] = [];
  public groupedServices: any[] = [];

  filterValue = '';

  constructor(private miteService: MiteService) {}

  ngOnInit(): void {
    this.workingOnForm = new FormGroup({
      projectName: new FormControl(null),
      service: new FormControl(null),
      workingOnInput: new FormControl(null),
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
  myResetFunction(options: DropdownFilterOptions) {
    options.reset?.();
    this.filterValue = '';
  }

  private groupProjectsByCustomer(projects: Project[]): any[] {
    const grouppedArray: any[] = [];
    projects.forEach((project) => {
      this.placeProjectInCustomerGroup(project.name, grouppedArray, project);
    });
    return grouppedArray;
  }

  private placeProjectInCustomerGroup(name: string, arrayPart: any[], project: Project) {
    const splittedName = name.split(' / ');
    let customerName = splittedName[0];
    const rest = splittedName.slice(1).join(' / ');

    const foundIndex = arrayPart.findIndex((item) => item.name === customerName);
    if (foundIndex !== -1) {
      const foundItem = arrayPart[foundIndex];
      this.placeProjectInCustomerGroup(rest, foundItem.items, project);
    } else {
      if (splittedName.length > 1) {
        arrayPart.push({
          name: customerName,
          project,
          items: [],
        });

        this.placeProjectInCustomerGroup(rest, arrayPart[arrayPart.length - 1].items, project);
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
}
