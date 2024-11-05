import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pregunta } from '../../../models/Pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { Sort, MatSortModule, MatSort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listar-pregunta',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './listar-pregunta.component.html',
  styleUrl: './listar-pregunta.component.css'
})
export class ListarPreguntaComponent implements OnInit, AfterViewInit{
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource:MatTableDataSource<Pregunta>=new MatTableDataSource()

  displayedColumns:string[]=['id_pregunta', 'pregunta', 'puntos', 'cuestionario']

  @ViewChild(MatSort) sort: MatSort | null=null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
}

  constructor(private pS:PreguntaService){}

  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
