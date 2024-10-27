import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySelectComponent } from './secondary-select.component';

describe('SecondarySelectComponent', () => {
  let component: SecondarySelectComponent;
  let fixture: ComponentFixture<SecondarySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondarySelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondarySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
