import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiqueEGanheModalComponent } from './indique-e-ganhe-modal.component';

describe('IndiqueEGanheModalComponent', () => {
  let component: IndiqueEGanheModalComponent;
  let fixture: ComponentFixture<IndiqueEGanheModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiqueEGanheModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiqueEGanheModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
