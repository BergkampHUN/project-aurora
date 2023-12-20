import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { HoursAndMinutesPipe } from 'src/app/pipes/hours-and-minutes.pipe';
import { MiteService } from 'src/app/services/mite.service';
import { externalTooltipHandler, servicesData } from './summaries.constant';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-summaries',
  standalone: true,
  imports: [CommonModule, ChartModule, HoursAndMinutesPipe, TooltipModule],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.scss',
})
export class SummariesComponent implements OnInit {
  @Input({ required: true }) date!: Date;
  public chartData: any;
  public chartOptions: any;
  public totalTrackedMinutes: number = 0;
  public services: any[] = [];
  public readonly servicesData = servicesData;
  private readonly miteService: MiteService = inject(MiteService);

  ngOnInit(): void {
    this.chartData = {
      datasets: [
        {
          labels: [],
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };
    this.chartOptions = {
      plugins: {
        tooltip: {
          callbacks: {
            title: (data: any) => {
              console.log(data);
              return `${data[0].dataset.labels[data[0].dataIndex]}: ${
                data[0].dataset.data[data[0].dataIndex]
              }%`;
            },
            // To change label in tooltip
            label: (data: any) => {
              return data.parsed.y === 2 ? 'Good' : 'Critical';
            },
          },
          backgroundColor: '#FFF',
          titleFontSize: 16,
          titleFontColor: '#000',
          bodyFontColor: '#000',
          bodyFontSize: 14,
          displayColors: false,
        },
      },
    };
    this.getTimeEntries();
  }

  getTimeEntries(): void {
    this.miteService
      .getTimeEntries([
        { type: 'at', value: this.date?.toLocaleDateString('sv') },
        { type: 'group_by', value: 'service' },
      ])
      .subscribe((res) => {
        this.services = res.map((group: any) => {
          return {
            ...group.time_entry_group,
            shortName: group?.time_entry_group?.service_name?.slice(4),
          };
        });

        this.setChartData();
        console.log(this.services);
      });
  }

  setChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    this.totalTrackedMinutes = this.calculateTotalTrackedMinutes();
    this.chartData.datasets = [
      {
        labels: [],
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ];
    this.services.forEach((service: any) => {
      this.chartData.datasets[0].labels.push(service.service_name);
      this.chartData.datasets[0].data.push(
        ((service.minutes / this.totalTrackedMinutes) * 100).toFixed(1)
      );
      this.chartData.datasets[0].backgroundColor.push(
        documentStyle.getPropertyValue(`--${this.servicesData[service.shortName].color}-100`)
      );
      this.chartData.datasets[0].hoverBackgroundColor.push(
        documentStyle.getPropertyValue(`--${this.servicesData[service.shortName].color}-500`)
      );
    });

    console.log(this.chartData);
  }

  private calculateTotalTrackedMinutes(): number {
    return this.services.reduce((acc, curr) => acc + curr.minutes, 0);
  }
}
