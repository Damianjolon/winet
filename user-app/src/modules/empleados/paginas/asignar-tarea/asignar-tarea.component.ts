import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
selector: 'app-asignar-tarea',
templateUrl: './asignar-tarea.component.html',
styleUrls: ['./asignar-tarea.component.css']
})
export class AsignarTareaComponent implements OnInit {
idEmpleado!: number;
form = this.fb.group({
titulo: ['', Validators.required],
descripcion: [''],
prioridad: ['MEDIA', Validators.required],
fecha: [new Date(), Validators.required]
});


constructor(private fb:FormBuilder, private route:ActivatedRoute, private router:Router){}


ngOnInit(){ this.idEmpleado = +(this.route.snapshot.paramMap.get('id') || 0); }


asignar(){
// Llamar al servicio para asignar (this.idEmpleado + this.form.value)
this.router.navigate(['/empleados/tareas']);
}
}
