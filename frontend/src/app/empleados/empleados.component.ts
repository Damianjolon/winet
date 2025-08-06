import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent {
displayedColumns: any;
dataSource: CdkTableDataSourceInput<any> | undefined;

}
