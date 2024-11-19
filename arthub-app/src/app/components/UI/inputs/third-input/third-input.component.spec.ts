import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdInputComponent } from './third-input.component';

describe('ThirdInputComponent', () => {
  let component: ThirdInputComponent;
  let fixture: ComponentFixture<ThirdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
