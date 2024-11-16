import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';

@Component({
  selector: 'app-usuariospor-cuestionarios',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './usuariospor-cuestionarios.component.html',
  styleUrl: './usuariospor-cuestionarios.component.css'
})
export class UsuariosporCuestionariosComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private caS:CuestionarioAcademicoService){}

  ngOnInit(): void {
    this.caS.getUserXCuest().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData = [
        {
          data: data.map((item) => item.cuestionarios_resueltos),
          label: 'Cantidad de Cuestionarios Resueltos',
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
