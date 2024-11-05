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

  displayedColumns:string[]=['c1','c2','c3','c4']

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    if (this.sort) {
        this.dataSource.sort = this.sort;
    }
}

  constructor(private pS:PreguntaService){}

  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
