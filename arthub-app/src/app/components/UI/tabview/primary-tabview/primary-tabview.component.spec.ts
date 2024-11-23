import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryTabviewComponent } from './primary-tabview.component';

describe('PrimaryTabviewComponent', () => {
  let component: PrimaryTabviewComponent;
  let fixture: ComponentFixture<PrimaryTabviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryTabviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryTabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
