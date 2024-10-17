import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuContentComponent } from './sidebar-menu-content.component';

describe('SidebarMenuContentComponent', () => {
  let component: SidebarMenuContentComponent;
  let fixture: ComponentFixture<SidebarMenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenuContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
