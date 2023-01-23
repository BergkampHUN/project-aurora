import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MiteService } from '../services/mite.service';
import { Project, Service } from '../interfaces/mite';

@Component({
  selector: 'app-working-on',
  templateUrl: './working-on.component.html',
  styleUrls: ['./working-on.component.scss'],
})
export class WorkingOnComponent implements OnInit {
  workingOnForm!: FormGroup;

  public projects: Project[] = [];

  public services: Service[] = [];

  constructor(private miteService: MiteService) {}

  ngOnInit(): void {
    this.workingOnForm = new FormGroup({
      projectName: new FormControl(null),
      service: new FormControl(null),
      workingOnInput: new FormControl(null),
    });

    this.miteService.getProjects().subscribe((res) => {
      this.projects = res;
    });

    this.miteService.getServices().subscribe((res) => {
      this.services = res;
    });
  }
}
