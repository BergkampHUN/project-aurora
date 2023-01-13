import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-working-on',
  templateUrl: './working-on.component.html',
  styleUrls: ['./working-on.component.scss'],
})
export class WorkingOnComponent {
  workingOnForm = new FormGroup({
    projectName: new FormControl(null),
    service: new FormControl(null),
    workingOnInput: new FormControl(null),
  });
}
