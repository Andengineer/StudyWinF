import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
//npm install ng2-charts chart.js --save
import { Chart, registerables } from 'chart.js';
import { CursoService } from '../../../services/curso.service';
Chart.register(...registerables);
@Component({
  selector: 'app-cantidadpor-categoria',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadpor-categoria.component.html',
  styleUrl: './cantidadpor-categoria.component.css'
})
export class CantidadporCategoriaComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: CursoService) { }

  ngOnInit(): void {
    this.cS.getCursosxcategoria().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.categoria);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_cursos),
          label: 'Cantidad de cursos',
          backgroundColor: [
            '#000080', // Navy
            '#00008B', // Dark Blue
            '#0000CD', // Medium Blue
            '#1E3A78', // Dark Slate Blue
            '#2A52BE', // Denim
            '#003366', // Midnight Blue
            '#4682B4', // Steel Blue
            '#5F9EA0', // Cadet Blue
            '#1E90FF'  // Dodger Blue
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
