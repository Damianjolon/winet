import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTareaComponent } from './asignar-tarea.component';

describe('AsignarTareaComponent', () => {
  let component: AsignarTareaComponent;
  let fixture: ComponentFixture<AsignarTareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarTareaComponent]
    });
    fixture = TestBed.createComponent(AsignarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
