import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'project-aurora';
  public today: Date = new Date();
  public yesterday: Date = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

  ngOnInit(): void {}
}
