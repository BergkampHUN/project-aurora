import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  public hour: any = '0' + 0;
  public minute: any = '0' + 0;
  public second: any = '0' + 0;

  startTimer: any;
  running = false;

  ngOnInit(): void {}
}
