import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPerfilHomeComponent } from './content-perfil-home.component';

describe('ContentPerfilHomeComponent', () => {
  let component: ContentPerfilHomeComponent;
  let fixture: ComponentFixture<ContentPerfilHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPerfilHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPerfilHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
