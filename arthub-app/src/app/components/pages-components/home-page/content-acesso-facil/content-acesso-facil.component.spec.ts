import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAcessoFacilComponent } from './content-acesso-facil.component';

describe('ContentAcessoFacilComponent', () => {
  let component: ContentAcessoFacilComponent;
  let fixture: ComponentFixture<ContentAcessoFacilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAcessoFacilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentAcessoFacilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
