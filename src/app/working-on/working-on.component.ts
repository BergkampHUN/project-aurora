import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-working-on',
  templateUrl: './working-on.component.html',
  styleUrls: ['./working-on.component.scss'],
})
export class WorkingOnComponent implements OnInit {
  workingOnForm!: FormGroup;

  public projects = [
    { name: 'Aurora', code: 'AUR' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
  ];

  public services = [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }];

  constructor() {}

  ngOnInit(): void {
    this.workingOnForm = new FormGroup({
      projectName: new FormControl(null),
      service: new FormControl(null),
      workingOnInput: new FormControl(null),
    });
  }
}
