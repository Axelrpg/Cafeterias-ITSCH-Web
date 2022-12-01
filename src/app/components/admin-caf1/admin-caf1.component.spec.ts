import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaf1Component } from './admin-caf1.component';

describe('AdminCaf1Component', () => {
  let component: AdminCaf1Component;
  let fixture: ComponentFixture<AdminCaf1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCaf1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCaf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
