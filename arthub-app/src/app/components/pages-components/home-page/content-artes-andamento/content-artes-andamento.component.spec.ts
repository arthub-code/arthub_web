import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentArtesAndamentoComponent } from './content-artes-andamento.component';

describe('ContentArtesAndamentoComponent', () => {
  let component: ContentArtesAndamentoComponent;
  let fixture: ComponentFixture<ContentArtesAndamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentArtesAndamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentArtesAndamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
