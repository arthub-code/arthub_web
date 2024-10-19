import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerIosComponent } from './spinner-ios.component';

describe('SpinnerIosComponent', () => {
  let component: SpinnerIosComponent;
  let fixture: ComponentFixture<SpinnerIosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerIosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
