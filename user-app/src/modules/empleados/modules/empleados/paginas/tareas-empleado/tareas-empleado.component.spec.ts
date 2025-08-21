import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasEmpleadoComponent } from './tareas-empleado.component';

describe('TareasEmpleadoComponent', () => {
  let component: TareasEmpleadoComponent;
  let fixture: ComponentFixture<TareasEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TareasEmpleadoComponent]
    });
    fixture = TestBed.createComponent(TareasEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
