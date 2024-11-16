import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RecompensaService } from '../../../services/recompensa.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-recompensaspopulares',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recompensaspopulares.component.html',
  styleUrl: './recompensaspopulares.component.css'
})
export class RecompensaspopularesComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS:RecompensaService){}

  ngOnInit(): void {
    this.rS.getQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityRecompensas),
          label: 'Cantidad de Recompensas Canjeadas',
          backgroundColor: [
            '#a349e1', 
            '#672c90', 
            '#543ac9', 
            '#555be0', 
            '#c168e8', 
            '#741c9b', 
            '#d591e5', 
            '#4e29cd',
            '#7f4fd5',
            '#9967cc',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
