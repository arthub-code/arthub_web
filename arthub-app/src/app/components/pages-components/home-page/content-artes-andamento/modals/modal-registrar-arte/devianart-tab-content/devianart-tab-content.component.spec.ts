import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevianartTabContentComponent } from './devianart-tab-content.component';

describe('DevianartTabContentComponent', () => {
  let component: DevianartTabContentComponent;
  let fixture: ComponentFixture<DevianartTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevianartTabContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevianartTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
