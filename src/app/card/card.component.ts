import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  data: any;
  chartOptions: any;

  constructor() {}

  ngOnInit() {
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
}
