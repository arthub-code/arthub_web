import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarArteComponent } from './modal-registrar-arte.component';

describe('ModalRegistrarArteComponent', () => {
  let component: ModalRegistrarArteComponent;
  let fixture: ComponentFixture<ModalRegistrarArteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegistrarArteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegistrarArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
