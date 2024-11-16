import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RecompensaService } from '../../../services/recompensa.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-recompensasxasociado',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recompensasxasociado.component.html',
  styleUrl: './recompensasxasociado.component.css'
})
export class RecompensasxasociadoComponent implements OnInit{
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
    this.rS.getAsociadosQuantity().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.empresa);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_recompensas),
          label: 'Cantidad de Recompensas por Asociado',
          backgroundColor: [
            '#9d83e3', 
            '#af30e6', 
            '#332edc', 
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
